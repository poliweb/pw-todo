<template>
    <div class="container px-5 py-24 mx-auto min-h-screen">
         <!-- Прелоудер -->
         <template v-if="isLoading">
            <div class="flex flex-col items-center justify-center transition duration-300 ease-in-out">
                <div class="loader"></div>
                <p>Loading articles...</p>
            </div>
        </template>

        <!-- Сообщение, если тег не найден -->
        <template v-else-if="!articles.length || !articles[0].tag_list || articles[0].tag_list.length === 0">
            <p class="text-center text-red-500 text-5xl mb-8">
                Tag #{{ route.params.tagId }} not found!
            </p>
        </template>
        <!-- Список cтатей -->
        <template v-if="articles && articles.length">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
                <div v-for="article in articles" :key="article.id" class="">
                    <articles-cart-block :article="article"></articles-cart-block>
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

        <!-- Сообщение о пустом списке продуктов -->
        <template v-else>
            <p class="text-center">No articles available.</p>
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
import { ref, onMounted, watch, nextTick } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { useRoute } from 'vue-router';
import ArticlesCartBlock from '@/components/blocks/ArticlesCartBlock.vue';

const articles = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const noArticlesFound = ref(false);
const currentPage = ref(1);
const loadMoreRef = ref(null);
const hasMore = ref(true);
const MAX_PAGES = 12;

const route = useRoute();
let stopObserver = null;

// Функция для загрузки статей
const fetchArticles = async () => {
    const tagId = route.params.tagId;
    if (!tagId || isLoading.value || !hasMore.value) return;

    isLoading.value = true;
    errorMessage.value = '';
    noArticlesFound.value = false;

    try {
        // Обновляем заголовок страницы сразу
        document.title = `Tag #${tagId} Articles`;

        // console.log(`Fetching page: ${currentPage.value}, Tag #${tagId} `);
        const response = await fetch(`https://dev.to/api/articles?tag=${tagId}&top=365&page=${currentPage.value}`);
        if (!response.ok) throw new Error('Failed to fetch articles');

        const newArticles = await response.json();

        // Проверка на дубликаты
        const uniqueArticles = newArticles.filter(
            (article) => !articles.value.some((a) => a.id === article.id)
        );

        // Проверка: если статьи не найдены, устанавливаем флаг noArticlesFound
        if (uniqueArticles.length === 0 && currentPage.value === 1) {
            noArticlesFound.value = true;
        } else if (uniqueArticles.length === 0) {
            hasMore.value = false;
        } else {
            articles.value.push(...uniqueArticles);
        }
    } catch (error) {
        errorMessage.value = error.message;
    } finally {
        isLoading.value = false;
    }
};

// Функция для загрузки следующей страницы
const loadMoreArticles = () => {
    if (hasMore.value && currentPage.value < MAX_PAGES) {
        currentPage.value += 1;
        fetchArticles();
    }
};

// Функция для сброса состояния при смене тега
const resetState = () => {
    articles.value = [];
    currentPage.value = 1;
    hasMore.value = true;
    errorMessage.value = '';
    noArticlesFound.value = false;
};

// Инициализация наблюдателя
const initObserver = () => {
    // Проверяем, является ли stopObserver функцией перед вызовом
    if (typeof stopObserver === 'function') {
        stopObserver(); // Останавливаем старый наблюдатель
    }

    stopObserver = useIntersectionObserver(loadMoreRef, ([entry]) => {
        if (entry.isIntersecting && !isLoading.value && hasMore.value) {
            loadMoreArticles();
        }
    }, {
        rootMargin: '400px',
    });
};

// Загружаем данные при первой загрузке компонента
onMounted(async () => {
    resetState(); // Сбрасываем состояние при первой загрузке
    await fetchArticles();
    await nextTick();
    initObserver();
});

// Следим за изменениями в параметре tagId
watch(() => route.params.tagId, async () => {
    resetState();
    await fetchArticles();
    await nextTick();
    initObserver();
});
</script>


<style scoped></style>