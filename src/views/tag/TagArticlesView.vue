<template>
    <div class="w-full bg-pink-500 mt-[64px] lg:mt-[99px]">
        <div class="container px-5 py-24 mx-auto">
            <!-- Прелоудер -->
            <template v-if="isLoading">
                <div class="flex flex-col items-center justify-center transition duration-300 ease-in-out">
                    <div class="loader"></div>
                    <p>Loading articles...</p>
                </div>
            </template>

            <!-- Ошибка или пустой список тегов -->
            <template v-else-if="!articles.length || !articles[0].tag_list?.length">
                <div class="flex items-start gap-4">
                    <h2 class="uppercase text-white text-left text-3xl font-bold">
                        Tag #{{ route.params.tagId }} not found!
                    </h2>
                    <IconDev class="w-6 h-6 text-white mt-1" />
                </div>
            </template>

            <!-- Основной блок с данными -->
            <template v-else-if="articles[0].tag_list?.length">
                <div class="flex items-start gap-4">
                    <h2 class="uppercase text-white text-left text-3xl font-bold">
                        Articles by Tag #{{ route.params.tagId }}
                    </h2>
                    <IconDev class="w-6 h-6 text-white mt-1" />
                </div>
                <p class="text-white w-full md:w-1/3 mt-4">
                    Browse our collection of articles on various topics related to IT technologies. Dive in and explore
                    something new!
                </p>
            </template>
        </div>
    </div>

    <div class="container px-5 py-24 mx-auto min-h-screen">

        <!-- Список статей -->
        <template v-if="articles.length">
            <!-- Кнопка переключения -->
            <button @click="toggleArticles" class="btn-primary mb-4">
                {{ topArticles === '' ? 'Show Top' : 'Show Recent' }}
            </button>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="article in articles" :key="article.id">
                    <articles-cart-block :article="article" />
                </div>
            </div>
        </template>

        <!-- Ошибка -->
        <template v-else-if="errorMessage">
            <div class="text-center text-red-500">
                <p>Error: {{ errorMessage }}!</p>
                <p>There may be no internet connection</p>
                <p>Try again later.</p>
            </div>
        </template>

        <!-- Пустой список статей -->
        <template v-else-if="noArticlesFound">
            <div>
                <p class="text-center text-2xl">No articles available.</p>
                <div class="text-center mx-auto text-xl flex flex-wrap items-center justify-center">
                    My favorite tags:
                    <router-link to="/tag/nuxt" class="tag-link">#Nuxt</router-link>
                    <router-link to="/tag/vue" class="tag-link">#Vue</router-link>
                    <router-link to="/tag/javascript" class="tag-link">#JavaScript</router-link>
                    <router-link to="/tag/laravel" class="tag-link">#Laravel</router-link>
                    <router-link to="/tag/hacking" class="tag-link">#Hacking</router-link>
                </div>
            </div>
        </template>

        <!-- Индикатор загрузки следующей страницы -->
        <div ref="loadMoreRef" class="flex justify-center mt-8 transition duration-300 ease-in-out">
            <div v-if="isLoading && currentPage > 1">
                <div class="loader"></div>
                <p>Loading more articles...</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed, defineProps } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { useRoute } from 'vue-router';
import ArticlesCartBlock from '@/components/blocks/ArticlesCartBlock.vue';
import IconDev from '@/components/icons/iconDev.vue';

const articles = ref([]);
const isLoadingPage = ref(true);
const isLoading = ref(false);
const errorMessage = ref('');
const noArticlesFound = ref(false);
const currentPage = ref(1);
const loadMoreRef = ref(null);
const hasMore = ref(true);
const MAX_PAGES = 12;
const topArticles = ref('&top=365'); // Начальное значение — без фильтра

defineProps({
    tagId: {
        type: String,
        required: false, // Сделать необязательным, если компонент может работать без этого параметра
    },
});

const route = useRoute();
let stopObserver = null;

const hasTagId = computed(() => {
    const tagId = route.params.tagId;
    return tagId && tagId.trim().length > 0;
});

// Метод для переключения значения topArticles
const toggleArticles = () => {
    topArticles.value = topArticles.value === '' ? '&top=365' : '';
    // console.log(`Toggled to: ${topArticles.value}`);
};

const fetchArticles = async () => {
    const tagId = route.params.tagId;
    if (!tagId || tagId.trim().length === 0 || isLoading.value || !hasMore.value) return;

    isLoading.value = true;
    errorMessage.value = '';
    noArticlesFound.value = false;

    try {
        const response = await fetch(`https://dev.to/api/articles?tag=${tagId}${topArticles.value}&page=${currentPage.value}`);
        if (!response.ok) throw new Error('Failed to fetch articles');

        const newArticles = await response.json();
        const uniqueArticles = newArticles.filter(
            (article) => !articles.value.some((a) => a.id === article.id)
        );

        if (uniqueArticles.length === 0) {
            if (articles.value.length === 0) noArticlesFound.value = true;
            hasMore.value = false;
        } else {
            articles.value.push(...uniqueArticles);
        }
    } catch (error) {
        errorMessage.value = error.message;
    } finally {
        isLoading.value = false;
        isLoadingPage.value = false;
    }
};

const loadMoreArticles = () => {
    if (hasMore.value && currentPage.value < MAX_PAGES) {
        currentPage.value += 1;
        fetchArticles();
    }
};

const resetState = () => {
    articles.value = [];
    currentPage.value = 1;
    hasMore.value = true;
    errorMessage.value = '';
    noArticlesFound.value = false;
    isLoading.value = false;
};

const resetArticles = () => {
    articles.value = [];
    currentPage.value = 1;
    hasMore.value = true;
    fetchArticles(); // Перезагружаем статьи
};

const initObserver = () => {
    if (!loadMoreRef.value) {
        console.warn('loadMoreRef is not defined. IntersectionObserver will not work.');
        return;
    }
    // Остановить предыдущий наблюдатель, если он существует
    if (stopObserver) stopObserver.stop();  // Используем метод stop(), а не просто вызываем переменную как функцию

    // Инициализация нового наблюдателя
    stopObserver = useIntersectionObserver(
        loadMoreRef,
        ([entry]) => {
            if (entry.isIntersecting && !isLoading.value && hasMore.value) {
                loadMoreArticles();
            }
        },
        { rootMargin: '400px' }
    );
};

onMounted(async () => {
    document.title = hasTagId.value ? `Tag #${route.params.tagId} Articles` : 'Articles';
    resetState();
    await fetchArticles();
    await nextTick();
    initObserver();
});

watch(() => route.params.tagId, async (newTagId) => {
    try {
        document.title = newTagId ? `Tag #${newTagId} Articles` : 'Articles';
        resetState();
        await fetchArticles();
        await nextTick();
        initObserver();
    } catch (err) {
        console.error('Error in tagId watcher:', err);
    }
});

// Следим за изменением фильтров
watch(topArticles, () => {
    resetArticles(); // Сбрасываем статьи при переключении фильтра
});


</script>


<style scoped></style>