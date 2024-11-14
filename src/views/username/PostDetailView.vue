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
  
  <script>
  export default {
    props: ['userId', 'postId'],
    data() {
      return {
        article: null,
      };
    },
    async created() {
      try {
        // Запрос к API для получения статьи
        const response = await fetch(`https://dev.to/api/articles/${this.postId}`);
        const article = await response.json();
  
        // Проверяем, совпадает ли имя пользователя
        if (article.id && article.user.username === this.userId) {
          this.article = article;
        } else {
          // Если статья не найдена или пользователь не совпадает, выбрасываем ошибку
          this.showNotFoundError();
        }
      } catch (error) {
        console.error('Ошибка при загрузке статьи:', error);
        this.showNotFoundError();
      }
    },
    methods: {
      showNotFoundError() {
        if (process.server) {
          this.$nuxt.context.res.statusCode = 404;
        }
        throw new Error('Статья не найдена');
      },
    },
  };
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