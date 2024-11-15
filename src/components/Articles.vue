<template>
    <div class="container px-5 py-24 mx-auto min-h-screen">
        <div class="text-center mb-[60px]">
            <h3
                class="text-[#000] font-medium uppercase pb-4 text-xl pb-4 mb-4">
                Updates From Our Shop
            </h3>
            <p class="text-[#999] text-[13px]">
                In a freak mishap ranger and its pilot captain william buck rogers are blown
            </p>
        </div>
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

        <!-- Список продуктов -->
        <template v-else-if="articles && articles.length">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
                <div v-for="article in articles" :key="article.id" class="card item-article">
                    <div class="card-image-container relative overflow-hidden mb-4 ">
                        <!-- Блок фото -->
                        <router-link :to="{
                            name: 'PostDetail',
                            params: {
                                userId: article.user.username, // Значение `userId` из данных статьи
                                postId: article.id,      // Значение `postId` из данных статьи
                            },
                        }" >
                        <div class="relative overflow-hidden">
                            <img v-if="article.cover_image" :src="article.cover_image" :alt="article.title"
                                class="lg:h-48 md:h-36 w-full object-cover object-center item-article__img transition duration-700 ease-in-out" />
                            <img v-else :src="article.social_image" :alt="article.title"
                                class="lg:h-48 md:h-36 w-full object-cover object-center item-article__img transition duration-700 ease-in-out" />
                            <div class="absolute bottom-0 left-0 flex items-center gap-4">
                                <img :src="article.user.profile_image" :alt="article.user.name"
                                    class="rounded-full w-10 h-10" />
                                <div class="bg-pink-600 px-2 py-1 text-white rounded"><span class="">{{
                                    article.user.name }}</span></div>
                            </div>

                        </div>
                        </router-link>
                    </div>
                    <div class="flex flex-wrap gap-x-4">
                        <div v-for="tag in article.tag_list" :key="tag">
                            <h2
                                class="tracking-widest text-xs title-font font-medium text-pink-500 hover:text-pink-800 mb-1 uppercase transition duration-700 ease-in-out">
                                #{{ tag }}</h2>
                        </div>
                    </div>
                    <router-link :to="{
                            name: 'PostDetail',
                            params: {
                                userId: article.user.username, // Значение `userId` из данных статьи
                                postId: article.id,      // Значение `postId` из данных статьи
                            },
                        }" >
                    <h2 class="card-title ">{{ article.title }}</h2>
                    </router-link>
                    <p class="card-description font-light">{{ article.description }}</p>
                    <!-- Блок информации -->
                    <div class="flex items-center flex-wrap">

                        <router-link :to="{
                            name: 'PostDetail',
                            params: {
                                userId: article.user.username, // Значение `userId` из данных статьи
                                postId: article.id,      // Значение `postId` из данных статьи
                            },
                        }" class="text-pink-500 hover:text-pink-800 inline-flex items-center md:mb-2 lg:mb-0 transition duration-700 ease-in-out">
                            Learn More
                        </router-link>

                        <span
                            class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            <IconsFavoriteBase v-if="article.positive_reactions_count > 0" class="w-4 h-4 mr-1 text-pink-500" />
                            <IconsFavorite v-else class="w-4 h-4 mr-1" />
                            {{ article.positive_reactions_count }}
                        </span>
                        <span
                            class="text-gray-400 inline-flex items-center leading-none text-sm mr-3  pr-3 py-1 border-r-2 border-gray-200">
                            <IconChatBase v-if="article.comments_count > 0" class="w-4 h-4 mr-1 text-pink-500" />
                            <iconChat v-else class="w-4 h-4 mr-1" />
                            {{ article.comments_count }}
                        </span>
                        <span class="text-gray-400 inline-flex items-center leading-none text-sm ">
                            {{ article.readable_publish_date }}
                            <!-- <date v-if="article.published_at">{{ article.published_at }}</date> -->
                        </span>
                    </div>
                </div>
            </div>
        </template>

        <!-- Сообщение о пустом списке продуктов -->
        <template v-else>
            <p class="text-center">No articles available.</p>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import IconsFavorite from "./icons/Favorite.vue";
import IconsFavoriteBase from "./icons/favoriteBase.vue";
import iconChat from "./icons/iconChat.vue";
import IconChatBase from './icons/iconChatBase.vue';

const articles = ref([]);
const isLoading = ref(true);
const errorMessage = ref('');
const wordLimit = 10; // Лимит на количество слов
const charLimit = 50; // Лимит на количество символов (включая пробелы)


const truncateDescription = (description) => {
    if (description.length > charLimit) {
        return description.slice(0, charLimit) + '...'; // Обрезаем по символам и добавляем троеточие
    }
    return description;
};



// Вытягивание даных из файла json 
// Ссылка на фейковые товары https://dummyjson.com/articles?limit=20&skip=20&select=title,price,description,thumbnail
const fetchArticles = async () => {
    isLoading.value = true;
    errorMessage.value = ''; // Сброс ошибки перед новым запросом
    try {
        const response = await fetch('https://dev.to/api/articles/?tag=nuxt&per_page=21');

        if (!response.ok) {
            throw new Error('Failed to fetch articles / Не удалось получить продукты');
        }
        const responseData = await response.json();
        articles.value = responseData;
        // console.log(articles.value);
    } catch (error) {
        errorMessage.value = error.message || 'An unknown error occurred / Произошла неизвестная ошибка';
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchArticles();
});
</script>

<style scoped>
.card {
    @apply p-4 border rounded-lg shadow-lg relative overflow-hidden;
}

.card-image {
    @apply w-full h-48 object-cover;
}

.dop-card {
    @apply w-0 h-0 inset-[50%] opacity-0 transition-all duration-700 ease-in-out;
}

.card:hover .card-image-container .dop-card {
    @apply w-full h-full bg-gray-900/60 inset-0 opacity-100;
}

.card-title {
    @apply text-xl font-semibold mb-4;
}

.card-description {
    @apply text-gray-600 mb-2;
}

.card-price {
    @apply text-green-700 text-lg font-bold text-right;
}

/* Простой стиль для прелоудера */
.loader {
    border: 4px solid #f3f3f3;
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
}

.simvolText {
    width: 50ch;
    /* Ограничение в 20 символов */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.stroka {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    /* Ограничение на 5 строк */
    overflow: hidden;
    text-overflow: ellipsis;
    /* Добавляет троеточие, если текст обрезан */
    max-height: calc(1.2em * 5);
    /* Устанавливаем максимальную высоту */
    line-height: 1.2;
    /* Высота строки (настраивайте под дизайн) */
}

.item-article:hover .item-article__img {
    transform: scale(1.5);
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>