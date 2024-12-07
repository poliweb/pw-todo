<template>
  <!-- Прелоудер -->
  <template v-if="isLoading">
    <div class="flex flex-col items-center justify-center min-h-screen">
      <div class="loader"></div>
      <p>Loading articles...</p>
    </div>
  </template>

  <section class="text-gray-600 body-font mt-[64px] lg:mt-[99px]">
    <div class="container px-5 py-5 md:py-24 mx-auto flex flex-col">
      <div v-if="article" class="w-full mx-auto">
        <div class="rounded-lg overflow-hidden">
          <img v-if="article.cover_image" :src="article.cover_image" :alt="article.title"
            class="w-full object-cover object-center item-article__img transition duration-700 ease-in-out" />
          <img v-else :src="article.social_image" :alt="article.title"
            class="w-full object-cover object-center item-article__img transition duration-700 ease-in-out" />
        </div>

        <div class="flex flex-wrap gap-2 mt-4">
          <router-link :to="`/tag/${tag}`" class="tag-link" v-for="tag in article.tags" :key="tag">#{{ tag
            }}</router-link>
        </div>

        <div class="flex flex-col md:flex-row mt-10">
          <div class="order-2 md:order-1 w-full md:w-1/3 text-center md:pr-8 md:py-8">
            <div class="sticky top-[100px]">
              <!-- ============== -->
              <router-link :to="{
                name: 'UserDetail',
                params: {
                  userId: user.username, // Значение `userId` из данных статьи
                },
              }">
                <div
                  class="w-40 h-40 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400 hover:scale-110  transition duration-300 ease-in-out">
                  <img :src="user.profile_image" :alt="user.name"
                    class="rounded-full shadow-2xl transition duration-300 ease-in-out" />
                </div>
              </router-link>
              <div class="flex flex-col items-center text-center justify-center">
                <router-link :to="{
                  name: 'UserDetail',
                  params: {
                    userId: user.username, // Значение `userId` из данных статьи
                  },
                }">
                  <h2
                    class="font-medium title-font mt-4 text-gray-900 hover:text-pink-500 text-xl lg:text-2xl transition duration-300 ease-in-out">
                    {{ user.name }}
                    <span class="text-base lg:text-xl text-gray-500">@{{ user.username }}</span>
                  </h2>
                </router-link>
                <div class="w-12 h-1 bg-pink-500 rounded mt-2 mb-4"></div>
                <p v-if="user.summary" class="text-base my-4">
                  <span class="text-gray-400">About:</span>
                  {{ user.summary }}
                </p>
                <div class="my-4">
                  <div v-if="user.location" class="flex flex-wrap gap-2">
                    <div class="text-gray-400">Location:</div>
                    <div class="text-gray-800 font-bold">
                      {{ user.location }}
                    </div>
                  </div>
                  <div v-if="user.joined_at" class="flex flex-wrap gap-2">
                    <div class="text-gray-400">Joined:</div>
                    <div class="text-gray-800 font-bold">
                      {{ user.joined_at }}
                    </div>
                  </div>
                </div>
                <!-- Icons Linls ==============================-->
                <div class="ml-auto mr-auto mt-4">
                  <div class="links flex justify-center items-center gap-4">
                    <a v-if="user.github_username" :href="`https://github.com/${user.github_username}`" target="_blank"
                      rel="nofollow noopener noreferrer" title="Github">
                      <!-- <github-icon /> -->
                      <IconGithub
                        class="w-6 h-6 hover:text-pink-700 hover:scale-125 text-pink-500 transition duration-300 ease-in-out" />
                    </a>
                    <a v-if="user.twitter_username" :href="`https://twitter.com/${user.twitter_username}`"
                      target="_blank" rel="nofollow noopener noreferrer" title="Twitter-X">
                      <!-- <twitter-icon /> -->
                      <IconTwiter
                        class="w-6 h-6 hover:text-pink-700 hover:scale-125 text-pink-500 transition duration-300 ease-in-out" />
                    </a>
                    <a v-if="user.website_url" :href="user.website_url" target="_blank"
                      rel="nofollow noopener noreferrer" title="Website">
                      <!-- <externallink-icon /> -->
                      <icon-web
                        class="w-6 h-6 hover:text-pink-700 hover:scale-125 text-pink-500 transition duration-300 ease-in-out" />
                    </a>
                    <a :href="`https://dev.to/${user.username}`" target="_blank" rel="nofollow noopener noreferrer"
                      title="Dev.to">
                      <!-- <dev-icon /> -->
                      <IconDev
                        class="w-6 h-6 hover:text-pink-700 hover:scale-125 text-pink-500 transition duration-300 ease-in-out" />
                    </a>
                  </div>
                </div>
                <!-- Icons Linls ==============================-->
              </div>
            </div>
          </div>
          <div
            class="order-1 md:order-2 w-full md:w-2/3 md:pl-8 mb-24 md:mb-0 md:py-8 md:border-l border-gray-200 md:border-t-0 border-t mt-4 pt-4 md:mt-0 text-left">
            <!-- Title -->
            <h2 class="text-2xl font-bold md:text-4xl my-8">{{ article.title }}</h2>
            <div class="flex flex-row items-center gap-4 mb-4">
              <!-- Date -->
              <div class="text-sm">
                Publish Date: <span class="text-pink-500 font-bold">{{ article.readable_publish_date }}</span>
              </div>

              <!-- Reactions Count -->
              <span
                class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                <IconsFavoriteBase v-if="article.positive_reactions_count > 0" class="w-4 h-4 mr-1 text-pink-500" />
                <IconsFavorite v-else class="w-4 h-4 mr-1" />
                {{ article.positive_reactions_count }}
              </span>

              <!-- Comments -->
              <span
                class="text-gray-400 inline-flex items-center leading-none text-sm mr-3  pr-3 py-1 border-r-2 border-gray-200">
                <IconChatBase v-if="article.comments_count > 0" class="w-4 h-4 mr-1 text-pink-500" />
                <iconChat v-else class="w-4 h-4 mr-1" />
                {{ article.comments_count }}
              </span>
            </div>

            <div class="content" v-html="article.body_html" />

            <!-- Comments Blok -->
            <div class="w-full h-1 rounded bg-pink-500 my-24"></div>
            <h3 class="text-3xl font-bold mb-8">Comments {{ article.comments_count }} total </h3>

            <CommentsBlok />

            <a :href="`https://dev.to/${user.username}/${article.slug}`" target="_blank"
              rel="nofollow noopener noreferer" class="btn-primary">
              Add comment
            </a>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import IconDev from '@/components/icons/iconDev.vue'
import IconWeb from '@/components/icons/iconWeb.vue'
import IconGithub from '@/components/icons/IconGithub.vue'
import IconTwiter from '@/components/icons/iconTwiter.vue'
import IconsFavorite from "@/components/icons/Favorite.vue";
import IconsFavoriteBase from "@/components/icons/favoriteBase.vue";
import iconChat from "@/components/icons/iconChat.vue";
import IconChatBase from '@/components/icons/iconChatBase.vue';
import CommentsBlok from '@/components/blocks/CommentsBlock.vue'

const isLoading = ref(true)

// Пропсы
const props = defineProps({
  userId: String,
  postId: String,
})

// Состояние компонента
const article = ref(null)
const user = ref(null)

// Функция для обработки ошибки
const showNotFoundError = () => {
  if (process.server) {
    useRouter().push({ path: '/404' }) // Редирект на страницу 404
  }
  throw new Error('Статья не найдена')
}

// Запрос к API и проверка данных
onMounted(async () => {
  isLoading.value = true
  try {
    const articleResponse = await fetch(
      `https://dev.to/api/articles/${props.postId}`
    )
    const userResponse = await fetch(
      `https://dev.to/api/users/by_username?url=${props.userId}`
    )
    const articleData = await articleResponse.json()
    const userData = await userResponse.json()

    if (articleData.id && articleData.user.username === props.userId) {
      article.value = articleData
      user.value = userData
      // Динамически обновляем title
      document.title = article.value.title
    } else {
      showNotFoundError()
    }
  } catch (error) {
    console.error('Ошибка при загрузке статьи:', error)
    if (error.message.includes('Unauthorized')) {
      router.push('/401');
    } else {
      router.push('/error');
    }
    showNotFoundError()
  } finally {
    isLoading.value = false
  }
})
</script>

<style>
.content .highlight {
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}

.highlight {
  background: #29292e;
  color: #f8f8f2;
}

.content p {
  margin-bottom: 1rem;
  font-size: 1rem; 
  line-height: 1.4;
}

.content h1 {
  font-size: 1.75em;
  margin-bottom: 10px;
  margin-top: 10px;
}

.content h2 {
  font-size: 1.5rem;
  line-height: 2rem;
  margin-bottom: 10px;
  margin-top: 10px;
}

.content h3 {
  font-size: 1.25em;
  margin-bottom: 10px;
  margin-top: 10px;
}

.content a {
  color: #ec4899;
}

.content pre {
  background: #29292e;
  border-radius: 2px;
  overflow: auto;
  padding: 1rem;
  color: #eff1f9;
  line-height: 1.42em;
  font-size: 13px;
}

.content pre code {
  display: block;
  /* Делаем элемент блочным */
  max-width: 100%;
  /* Ограничиваем ширину контейнера */
  overflow-x: auto;
  /* Добавляем горизонтальную прокрутку при необходимости */
  word-break: break-all;
  /* Разбиваем слова при переполнении */
  white-space: pre-wrap;
  /* Сохраняем перенос строк и пробелы */
  padding: 10px;
  font-family: monospace;
  /* Используем моноширинный шрифт */
}

.content p code {
  display: block;
  /* Делаем элемент блочным */
  max-width: 100%;
  /* Ограничиваем ширину контейнера */
  overflow-x: auto;
  /* Добавляем горизонтальную прокрутку при необходимости */
  word-break: break-all;
  /* Разбиваем слова при переполнении */
  white-space: pre-wrap;
  /* Сохраняем перенос строк и пробелы */
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  font-family: monospace;
  /* Используем моноширинный шрифт */
}

.content p a img {
  width: 100%;
}

.content ul li {
  overflow: hidden;
}

.highlight__panel {
  display: none;
}

iframe {
  width: 100%;
}

@media screen and (min-width: 380px) {
  pre {
    font-size: 15px;
  }


}
</style>
