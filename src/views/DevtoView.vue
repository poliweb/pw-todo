<template>
    <section class="bg-pink-500 mt-[64px] lg:mt-[99px]">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-white text-left w-full">
                <h2 class="uppercase text-white text-left text-3xl font-bold mb-4">
                    Popular Articles on Dev.To: Top Picks from the IT Community
                </h2>
                <p class="lg:w-1/2 leading-relaxed text-base">
                    Find out the latest news and best practices in programming collected from the platform Dev.to . Use
                    tag filters to find articles that match your interests and objectives.
                </p>
            </div>
        </div>
    </section>
    <section>
        <div class="container px-5 pt-12 pb-24 mx-auto">

            <!-- Прелоудер -->
            <template v-if="isLoading">
                <div class="flex flex-col items-center justify-center transition duration-300 ease-in-out">
                    <div class="loader"></div>
                    <p>Loading articles...</p>
                </div>
            </template>

            <!-- Ошибка -->
            <template v-if="errorMessage">
                <div class="text-center text-red-500">
                    <p>Error: {{ errorMessage }}!</p>
                    <p>There may be no internet connection</p>
                    <p>Try again later.</p>
                </div>
            </template>


            <template v-if="articles && articles.length">
                <!-- Кнопка переключения -->
                <button @click="toggleArticles" class="btn-primary mb-4">
                    {{ topArticles === '' ? 'Show Top' : 'Show Recent' }}
                </button>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
                    <div v-for="article in articles" :key="article.id" class="">
                        <articles-cart-block :article="article" />
                    </div>
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
    </section>
</template>



<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import ArticlesCartBlock from '@/components/blocks/ArticlesCartBlock.vue';

const articles = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const currentPage = ref(1);
const loadMoreRef = ref(null);
const hasMore = ref(true);
const MAX_PAGES = 12;
const topArticles = ref(''); // Начальное значение — без фильтра

// Метод для переключения значения topArticles
const toggleArticles = () => {
    topArticles.value = topArticles.value === '' ? '&top=365' : '';
    // console.log(`Toggled to: ${topArticles.value}`);
};

// Метод для загрузки статей
const fetchArticles = async () => {
    if (isLoading.value) return;

    isLoading.value = true;
    errorMessage.value = '';

    try {
        // Формируем URL для API-запроса
        const url = `https://dev.to/api/articles?tag=nuxt${topArticles.value}&state=rising&page=${currentPage.value}`;
        // console.log(`Fetching: ${url}`);

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch articles');

        const newArticles = await response.json();

        if (newArticles.length === 0) {
            hasMore.value = false; // Больше нет статей
        } else {
            if (currentPage.value === 1) {
                articles.value = newArticles; // Для первой страницы заменяем список
            } else {
                articles.value.push(...newArticles); // Для последующих страниц добавляем статьи
            }
        }
    } catch (error) {
        errorMessage.value = error.message;
    } finally {
        isLoading.value = false;
    }
};

// Метод для сброса статей при изменении фильтра
const resetArticles = () => {
    articles.value = [];
    currentPage.value = 1;
    hasMore.value = true;
    fetchArticles(); // Перезагружаем статьи
};

// Метод для загрузки дополнительных статей
const loadMoreArticles = () => {
    if (hasMore.value && currentPage.value < MAX_PAGES) {
        currentPage.value += 1;
        fetchArticles();
    }
};

onMounted(async () => {
    await fetchArticles();
    await nextTick();

    if (!loadMoreRef.value) {
        console.error('Element `loadMoreRef` is not initialized');
        return;
    }

    // Используем useIntersectionObserver для ленивой загрузки
    useIntersectionObserver(
        loadMoreRef,
        ([entry]) => {
            if (entry.isIntersecting && !isLoading.value && hasMore.value) {
                loadMoreArticles();
            }
        },
        {
            rootMargin: '300px', // Загрузить заранее, когда элемент находится на 300px ниже видимой области
        }
    );
});

// Следим за изменением фильтров
watch(topArticles, () => {
    resetArticles(); // Сбрасываем статьи при переключении фильтра
});
</script>



<style scoped></style>