<template>
    <div>
        <!-- Header -->
        <div :articlesCount="userArticles.length"
            class="flex flex-col items-center justify-center rounded-lg w-full h-64 bg-pink-500 overflow-hidden p-4 mb-4">
            <h2
                class="simvolText_18 text-[8vw] sm:text-[3.5vw] md:text-[3.5vw] 2xl:text-[70px] text-white text-center font-bold">
                {{ userArticles[0]?.user?.name }}
                <UsernameArticlesTotal />
            </h2>
        </div>

        <!-- Список статей -->
        <div class="grid grid-cols-1 2xl:grid-cols-2   gap-4" v-if="userArticles.length > 0">
            <UserArticlesCartBlock v-for="article in userArticles" :key="article.id" :article="article" />
        </div>

        <!-- Сообщение об отсутствии статей -->
        <p v-if="noArticlesFound" class="no-articles-message">
            No articles found.
        </p>

        <!-- Сообщение об ошибке -->
        <p v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </p>

        <!-- Лоадер -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center">
            <div class="loader"></div>
            <p>Loading articles...</p>
        </div>


        <!-- Невидимый элемент для триггера Intersection Observer -->
        <div ref="loadMoreRef" class="load-more-trigger"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { useRoute } from 'vue-router';
import UsernameArticlesTotal from '@/components/blocks/UsernameArticlesTotal.vue';
import UserArticlesCartBlock from '@/components/blocks/ArticlesCartBlock.vue';

// Состояния
const userArticles = ref([]);
const isLoading = ref(false);
const noArticlesFound = ref(false);
const errorMessage = ref('');
const currentPage = ref(1);
const loadMoreRef = ref(null); // Ссылка на элемент для отслеживания
const hasMore = ref(true);
const MAX_PAGES = 12;

// Получение userId из маршрута
const route = useRoute();
const userId = ref(route.params.userId);

// Функция для загрузки статей
const fetchArticles = async () => {
    if (isLoading.value || !hasMore.value) return; // Предотвращаем лишние вызовы

    isLoading.value = true;
    errorMessage.value = '';

    try {
        const response = await fetch(
            `https://dev.to/api/articles?username=${userId.value}&page=${currentPage.value}`
        );

        if (!response.ok) {
            throw new Error('Не удалось загрузить статьи');
        }

        const newArticles = await response.json();

        // Проверяем, есть ли новые статьи
        if (newArticles.length === 0) {
            noArticlesFound.value = userArticles.value.length === 0; // Нет статей вообще
            hasMore.value = false; // Больше страниц нет
        } else {
            userArticles.value.push(...newArticles);
        }
    } catch (error) {
        errorMessage.value = error.message;
    } finally {
        isLoading.value = false;
    }
};

// Обработчик для загрузки новых страниц
const loadMoreArticles = () => {
    if (hasMore.value && currentPage.value < MAX_PAGES) {
        currentPage.value += 1;
        fetchArticles();
    }
};

// Инициализация
onMounted(async () => {
    // Первоначальная загрузка статей
    await fetchArticles();
    await nextTick();

    if (!loadMoreRef.value) {
        console.error('Элемент loadMoreRef не найден');
        return;
    }

    // Настройка Intersection Observer для ленивой загрузки
    useIntersectionObserver(
        loadMoreRef,
        ([entry]) => {
            if (entry.isIntersecting && !isLoading.value && hasMore.value) {
                loadMoreArticles();
            }
        },
        {
            rootMargin: '400px', // Подгружать заранее, если элемент находится близко к видимой области
        }
    );
});
</script>


<!-- <script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useIntersectionObserver } from '@vueuse/core';
import { useRoute } from 'vue-router'
import UsernameArticlesTotal from '@/components/blocks/UsernameArticlesTotal.vue';
import UserArticlesCartBlock from '@/components/blocks/ArticlesCartBlock.vue';

const isLoading = ref(true)
const userArticles = ref([])
const noArticlesFound = ref(false) // Новая переменная состояния
const errorMessage = ref(null)
const currentPage = ref(1);
const loadMoreRef = ref(null);
const hasMore = ref(true);
const MAX_PAGES = 12;

const route = useRoute()

// Запрос к API и загрузка данных
onMounted(async () => {
    const userId = route.params.userId
    isLoading.value = true
    try {
        const response = await fetch(`https://dev.to/api/articles?username=${userId}`)

        if (!response.ok) {
            noArticlesFound.value = true
            return
        }

        const userData = await response.json()

        // Проверка: если массив пустой, то показываем сообщение
        if (Array.isArray(userData) && userData.length === 0) {
            noArticlesFound.value = true
            return
        }

        // Если статьи есть, сохраняем их
        userArticles.value = userData
        // console.log(userArticles.value)
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
        noArticlesFound.value = true
    } finally {
        isLoading.value = false
    }
})
</script> -->



<style scoped>
.text {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.simvolText_18 {
    width: 18ch;
    /* Ограничение в 20 символов */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>