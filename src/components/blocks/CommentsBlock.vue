<template>
    <div v-if="isLoading">Загрузка комментариев...</div>
    <div v-else>
        <div v-if="errorMessage">{{ errorMessage }}</div>
        <div v-else>
            <ul class="">
                <CommentItem v-for="comment in comments" :key="comment.id_code" :comment="comment" />
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CommentItem from './CommentItem.vue'

const isLoading = ref(true)
const comments = ref([])
const errorMessage = ref(null)

const route = useRoute()

// Функция для обработки ошибок
const handleError = (message = 'Ошибка при загрузке данных') => {
    console.error(message)
    errorMessage.value = message
}

// Запрос к API и загрузка данных
onMounted(async () => {
    // Извлекаем параметры userId и articleId из маршрута
    const userId = route.params.userId
    const articleId = route.params.postId

    // Проверяем, что параметры корректно переданы
    if (!userId || !articleId) {
        handleError('Параметры маршрута отсутствуют или некорректны.')
        return
    }

    isLoading.value = true
    try {
        const response = await fetch(`https://dev.to/api/comments?a_id=${articleId}`)

        if (!response.ok) {
            handleError('Не удалось загрузить комментарии.')
            return
        }

        const data = await response.json()

        if (Array.isArray(data)) {
            comments.value = data
        } else {
            handleError('Некорректный формат данных.')
        }
    } catch (error) {
        handleError(error.message)
    } finally {
        isLoading.value = false
    }
})
</script>


<style scoped></style>