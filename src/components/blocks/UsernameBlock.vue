<template>
    <!-- Прелоудер -->
    <template v-if="isLoading">
        <div class="flex flex-col items-center justify-center">
            <div class="loader"></div>
            <p>Loading articles...</p>
        </div>
    </template>

    <!-- Ошибка -->
    <template v-else-if="errorMessage">
        <div class="text-center text-red-500">
            <p>Error: {{ errorMessage }}</p>
        </div>
    </template>
    <template v-else>
        <div class="sticky top-8">
            <div>
                <!-- Аватар пользователя -->
                <div class="w-40 h-40 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                    <img :src="user.profile_image" :alt="user.name" class="rounded-full" />
                </div>

                <!-- Информация о пользователе -->
                <div class="flex flex-col items-center text-center justify-center">
                    <h2 class="font-medium title-font mt-4 text-gray-900 text-xl lg:text-2xl">
                        {{ user.name }}
                        <span class="text-base lg:text-xl text-gray-500">@{{ user.username }}</span>
                    </h2>
                    <div class="w-12 h-1 bg-pink-500 rounded mt-2 mb-4"></div>
                    <p v-if="user.summary" class="text-base my-4">
                        <span class="text-gray-400">About:</span> {{ user.summary }}
                    </p>

                    <div class="my-4">
                        <div v-if="user.location" class="flex flex-wrap gap-2">
                            <div class="text-gray-400">Location:</div>
                            <div class="text-gray-800 font-bold">{{ user.location }}</div>
                        </div>
                        <div v-if="user.joined_at" class="flex flex-wrap gap-2">
                            <div class="text-gray-400">Joined:</div>
                            <div class="text-gray-800 font-bold">{{ user.joined_at }}</div>
                        </div>
                    </div>

                    <!-- Ссылки на профили -->
                    <div class="links flex justify-center items-center gap-4">
                        <a v-if="user.github_username" :href="`https://github.com/${user.github_username}`"
                            target="_blank" title="Github">
                            <IconGithub class="w-6 h-6 hover:text-pink-700 text-pink-500" />
                        </a>
                        <a v-if="user.twitter_username" :href="`https://twitter.com/${user.twitter_username}`"
                            target="_blank" title="Twitter-X">
                            <IconTwiter class="w-6 h-6 hover:text-pink-700 text-pink-500" />
                        </a>
                        <a v-if="user.website_url" :href="user.website_url" target="_blank" title="Website">
                            <IconWeb class="w-6 h-6 hover:text-pink-700 text-pink-500" />
                        </a>
                        <a :href="`https://dev.to/${user.username}`" target="_blank" title="Dev.to">
                            <IconDev class="w-6 h-6 hover:text-pink-700 text-pink-500" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IconDev from '@/components/icons/iconDev.vue'
import IconWeb from '@/components/icons/iconWeb.vue'
import IconGithub from '@/components/icons/IconGithub.vue'
import IconTwiter from '@/components/icons/iconTwiter.vue'


const isLoading = ref(true)
const user = ref({})
const errorMessage = ref(null)

const route = useRoute()
const router = useRouter()


// Функция для обработки ошибки
const showNotFoundError = () => {
    if (process.server) {
        router.push({ path: '/404' })
    }
    console.error('User not found')
}

// Запрос к API и загрузка данных
onMounted(async () => {
    const userId = route.params.userId // Получаем userId из параметра маршрута
    isLoading.value = true
    try {
        const response = await fetch(`https://dev.to/api/users/by_username?url=${userId}`)

        // Проверка статуса ответа
        if (!response.ok) {
            showNotFoundError()
            return
        }

        const userData = await response.json()

        // Проверка данных
        if (userData && userData.username) {
            user.value = userData
            document.title = user.value.name || 'User Profile'
        } else {
            showNotFoundError()
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
        showNotFoundError()
    } finally {
        isLoading.value = false
    }
})
</script>


<style scoped></style>
