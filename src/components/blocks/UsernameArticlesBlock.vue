<template>
    <div>
        <div class="flex flex-col items-center justify-center rounded-lg w-full h-64 bg-pink-500 overflow-hidden">
            <!-- <img alt="content" class="object-cover object-center h-full w-full" src="https://dummyimage.com/1200x500" /> -->
             <h2 class="text-[5vw] sm:text-[2vw] md:text-[2.3vw] text-gray-100 text-center font-bold text">
                All articles from the author 
             </h2>
             <h3 class="text-[8vw] sm:text-[3.5vw] md:text-[3vw] text-white text-center font-bold text">
                {{ userArticles[0]?.user?.name }}
             </h3>
        </div>

        <div v-if="isLoading">
            <div class="flex flex-col items-center justify-center">
                <div class="loader"></div>
                <p>Loading articles...</p>
            </div>
        </div>
        <div v-else-if="noArticlesFound">Статьи не найдены</div>
        <div v-else>
            <ul>
                <li v-for="article in userArticles" :key="article.id">{{ article.title }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const isLoading = ref(true)
const userArticles = ref([])
const noArticlesFound = ref(false) // Новая переменная состояния
const errorMessage = ref(null)

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
</script>



<style scoped>
.text {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
.text_vw {
    font-size: 3vw;
}
</style>