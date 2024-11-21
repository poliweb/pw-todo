<template>
    <div>
        <!-- Header -->
        <div v-if="userArticles.length > 0"
            class="flex flex-col items-center justify-center rounded-lg w-full h-64 bg-pink-500 overflow-hidden p-4">
            <h2 class="simvolText_18 text-[8vw] sm:text-[3.5vw] md:text-[3.5vw] 2xl:text-[70px] text-white text-center font-bold">
                {{ userArticles[0]?.user?.name }}`s <UsernameArticlesTotal /> 
            </h2>
        </div>
        <div v-else
            class="flex flex-col items-center justify-center rounded-lg w-full h-64 bg-pink-500 overflow-hidden">
            <h2 class="text-[5vw] sm:text-[2vw] md:text-[2.3vw] text-gray-100 text-center font-bold text">
                This author has no articles
            </h2>
        </div>
        <!-- || Header -->
        <div v-if="isLoading">
            <div class="flex flex-col items-center justify-center">
                <div class="loader"></div>
                <p>Loading articles...</p>
            </div>
        </div>
        <div v-else-if="noArticlesFound">No articles found</div>
        <div v-else>
            <!-- <ul>
                <li v-for="article in userArticles" :key="article.id">{{ article.title }}</li>
            </ul> -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                <UserArticlesCartBlock v-for="article in userArticles" :article="article" :key="article.id" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import UsernameArticlesTotal from '@/components/blocks/UsernameArticlesTotal.vue';
import UserArticlesCartBlock from '@/components/blocks/ArticlesCartBlock.vue';

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

.simvolText_18 {
    width: 18ch;
    /* Ограничение в 20 символов */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}


</style>