<template>
    
    <div v-if="article">
      <h1>{{ article.title }}</h1>
      <p>Автор: {{ article.user.name }}</p>
      <div class="content" v-html="article.body_html" />
    </div>
    <div v-else>
      <h2>Статья не найдена</h2>
    </div>
  </template>
  

  <script setup>
import { ref, onMounted } from 'vue';

// Пропсы
const props = defineProps({
  userId: String,
  postId: String,
});

// Состояние компонента
const article = ref(null);

// Функция для обработки ошибки
const showNotFoundError = () => {
  if (process.server) {
    useRouter().push({ path: '/404' }); // Редирект на страницу 404
  }
  throw new Error('Статья не найдена');
};

// Запрос к API и проверка данных
onMounted(async () => {
  try {
    const response = await fetch(`https://dev.to/api/articles/${props.postId}`);
    const articleData = await response.json();

    if (articleData.id && articleData.user.username === props.userId) {
      article.value = articleData;
    } else {
      showNotFoundError();
    }
  } catch (error) {
    console.error('Ошибка при загрузке статьи:', error);
    showNotFoundError();
  }
});
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

pre {
  background: #29292e;
  border-radius: 2px;
  overflow: auto;
  padding: 1rem;
  color: #eff1f9;
  line-height: 1.42em;
  font-size: 13px;
}

@media screen and (min-width: 380px) {
  pre {
    font-size: 15px;
  }
}
</style>