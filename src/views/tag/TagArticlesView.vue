<template>
    <!-- Прелоудер -->
    <template  v-if="isLoading">
        <div class="flex flex-col items-center justify-center h-screen">
            <div class="loader"></div>
            <p>Loading articles...</p>
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
    <div v-else class="container px-5 py-24 mx-auto min-h-screen">
       <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
        <div v-for="article in tagArticles" :key="article.id" class="">
            <tag-items :article="article" />
        </div>

       </div>

    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import TagItems from '@/components/blocks/TagItems.vue'

const isLoading = ref(true)
const tagArticles = ref([])
const noArticlesFound = ref(false)
const errorMessage = ref(null)

const route = useRoute()

// Функция для загрузки данных
async function fetchTagArticles() {
    const tagId = route.params.tagId
    isLoading.value = true
    noArticlesFound.value = false
    errorMessage.value = null

    try {
        const response = await fetch(`https://dev.to/api/articles?tag=${tagId}&top=365`)

        if (!response.ok) {
            noArticlesFound.value = true
            return
        }

        const tagData = await response.json()

        if (Array.isArray(tagData) && tagData.length === 0) {
            noArticlesFound.value = true
            return
        }

        tagArticles.value = tagData
        console.log(tagArticles.value)
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
        noArticlesFound.value = true
        errorMessage.value = 'Ошибка при загрузке данных'
    } finally {
        isLoading.value = false
    }
}

// Загружаем данные при первой загрузке компонента
onMounted(fetchTagArticles)

// Следим за изменениями в параметре tagId
watch(() => route.params.tagId, fetchTagArticles)
</script>

<style scoped>

</style>