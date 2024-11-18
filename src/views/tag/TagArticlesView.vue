<template>
    <div class="container px-5 py-24 mx-auto min-h-screen">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            TegArticles: {{ route.params.tagId }}
        </h1>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const tag = ref('')

// Получаем параметр "tag" из маршрута
onMounted(() => {
  tag.value = route.params.tagId || 'Не указан'
})

</script>

<style scoped>

</style>