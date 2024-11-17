<template>
    <div v-if="userArticlesTotal.length > 0">
        <span class="text-[8vw] sm:text-[3.5vw] md:text-[3.5vw] 2xl:text-[70px] font-bold">articles - {{
            userArticlesTotal.length }} total</span>
    </div>
    <div v-else-if="noArticlesFound">0 total</div>
    <div v-else class="flex flex-col items-center justify-center">
        <p>Loading...</p>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const isLoading = ref(true)
const userArticlesTotal = ref([])
const noArticlesFound = ref(false) // Новая переменная состояния
const errorMessage = ref(null)

const route = useRoute()

// Запрос к API и загрузка данных
onMounted(async () => {
    const userId = route.params.userId
    isLoading.value = true
    try {
        const response = await fetch(`https://dev.to/api/articles?username=${userId}&per_page=250`)

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
        userArticlesTotal.value = userData
        // console.log(userArticles.value)
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
        noArticlesFound.value = true
    } finally {
        isLoading.value = false
    }
})
</script>


<style scoped></style>