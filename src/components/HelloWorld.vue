<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="greetings">
    <h1 class="text-3xl font-bold text-pink-500">{{ msg }}</h1>
    <h3 class="text-purple-700">
      You’ve successfully created a project with
      <a target="_blank" href="https://vitejs.dev/" class="text-orange-500">Vite</a> +
      <a target="_blank" href="https://vuejs.org/" class="text-orange-500">Vue 3</a>.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
