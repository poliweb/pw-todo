<template>
    <div class="relative">
        <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-5xl text-2xl font-medium title-font mb-4 text-gray-900">
                Top Articles Tagged with 
                <span class="text-pink-500 hover:text-pink-700 translation duration-300 ease-in-out">
                    <router-link to="/tag/vue">#Vue</router-link>
                </span>
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                A curated list of the most insightful and useful articles about Vue.js from the Dev.to community
            </p>
        </div>
        <template v-if="isLoading">
            <div class="flex flex-col items-center justify-center absolute left-[40%] top-24 right-[40%] bg-white p-10 transition duration-300 ease-in-out">
                <div class="loader"></div>
                <p class="text-lg  text-pink-700 z-36">Loading articles...</p>
            </div>
        </template>
        <div v-else-if="errorMessage">
            <p class="text-center text-lg  md:text-3xl text-purple-700">Error: {{ errorMessage }}! There may be no internet connection!</p>
        </div>
        <!-- Список статей -->
        <template v-if="articles.length">
            <!-- Фильтр -->
            <div class="flex flex-col md:flex-row ittems-start md:items-center md:justify-between gap-x-4">
                <!-- Период (top) -->
                <div class="mb-4 flex flex-col md:flex-row ittems-start md:items-center gap-x-4">
                    <legend>Articles From (days):</legend>
                    <div class="flex gap-2">
                        <label v-for="value in topOptions" :key="'top-' + value">
                            <input type="radio" :value="value" v-model="top" class="accent-pink-500" />
                            {{ value }}
                        </label>
                    </div>
                </div>

                <!-- Количество на страницу (per_page) -->
                <div class="mb-4 flex flex-col md:flex-row ittems-start md:items-center gap-x-4">
                    <legend>Articles Per Page:</legend>
                    <div class="flex gap-2">
                        <label v-for="value in perPageOptions" :key="'per-page-' + value">
                            <input type="radio" :value="value" v-model="perPage" class="accent-pink-500" />
                            {{ value }}
                        </label>
                    </div>
                </div>
            </div>

            <!-- Articles Block -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div v-for="article in articles" :key="article.id">
                    <articles-cart-block :article="article" />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ArticlesCartBlock from '@/components/blocks/ArticlesCartBlock.vue'

// Переменные для хранения состояния
const isLoading = ref(false)
const articles = ref([])
const errorMessage = ref(null)

// Параметры фильтра
const top = ref(365) // Значение по умолчанию
const perPage = ref(12) // Значение по умолчанию


// Опции для переключателей
const topOptions = [365, 200, 150, 100, 50]
const perPageOptions = [12, 20, 25, 30, 40]


// Функция для загрузки данных
const fetchArticles = async () => {
    const apiUrl = `https://dev.to/api/articles?tag=vue&top=${top.value}&per_page=${perPage.value}`
    isLoading.value = true
    errorMessage.value = null

    try {
        const response = await fetch(apiUrl)

        if (!response.ok) {
            throw new Error(`Data loading error: ${response.statusText}`)
        }

        const data = await response.json()

        // Сохраняем статьи
        articles.value = data
        // console.log(articles.value)
    } catch (error) {
        console.error('An error has occurred:', error)
        errorMessage.value = error.message
    } finally {
        isLoading.value = false
    }
}

// Следим за изменениями фильтров
watch([top, perPage], () => {
    fetchArticles()
    // console.log(`Selected top: ${top.value}, per_page: ${perPage.value}`)
})

// Загружаем данные при монтировании компонента
fetchArticles()
</script>

<style scoped>
.filter {
    gap: 1rem;
}
</style>