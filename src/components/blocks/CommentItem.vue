<template>
    <li class="mb-12 comment">
        <div class="flex flex-col md:flex-row items-start bg-gray-100 p-4 rounded-lg mb-4">
            <router-link :to="{ name: 'UserDetail', params: { userId: comment.user?.username } }">
                <img :src="comment.user?.profile_image_90 || 'default-avatar.png'" :alt="comment.user?.name"
                class="avatar hover:scale-110 transition duration-300 ease-in-out" />
            </router-link>
            <div class="comment-details">
                <router-link :to="{ name: 'UserDetail', params: { userId: comment.user?.username } }">
                    <strong class="text-pink-500 hover:text-pink-700 transition duration-300 ease-in-out">{{ comment.user?.name || 'Аноним' }}</strong>
                </router-link>
                <span class="comment-date mb-4">{{ formatDate(comment.created_at) }}</span>
                <div v-html="comment.body_html" class="comment-content"></div>
            </div>
        </div>

        <!-- Рендеринг дочерних комментариев -->
        <ul v-if="comment.children && comment.children.length">
            <CommentItem v-for="child in comment.children" :key="child.id_code" :comment="child" class="test" />
        </ul>
    </li>
</template>

<script setup>
import { computed } from 'vue'

// Пропсы
defineProps({
    comment: {
        type: Object,
        required: true
    }
})

// Форматирование даты
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style>


.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1rem;
}

.comment-details {
    flex: 1;
}

.comment-date {
    display: block;
    color: gray;
    font-size: 0.8rem;
    margin-top: 0.5rem;
}

.comment ul {
    list-style-type: none;
    padding-left: 2rem;
    margin: 0;
}

.highlight__panel {
    display: none;
}



.comment-content p {
  margin-bottom: 2rem;
  line-height: 1.4;
}

.comment-content h1 {
  font-size: 1.75em;
  margin-bottom: 10px;
  margin-top: 10px;
}

.comment-content h2 {
  font-size: 1.5rem;
  line-height: 2rem;
  margin-bottom: 10px;
  margin-top: 10px;
}

.comment-content h3 {
  font-size: 1.25em;
  margin-bottom: 10px;
  margin-top: 10px;
}

.comment-content a {
  color: #ec4899;
}

.comment-content .highlight pre {
  background: #533658;
  border-radius: 6px;
  overflow: auto;
  padding: 1rem;
  color: #eff1f9;
  line-height: 1.42em;
  font-size: 13px;
}

.comment-content pre code {
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

.comment-content p code {
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

.comment-content p a img {
  width: 100%;
}

.comment-content ul li {
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