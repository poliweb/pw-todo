<template>
    <section>
        <div class="container px-5 py-24 mx-auto">
            <div class="error-page py-48">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-500">ERROR!</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base mb-8">Error loading data: ReferenceError: process is not defined</p>
                <router-link to="/" class="btn-primary">Go to the home page</router-link>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

async function loadData() {
  try {
    // Ваш код загрузки данных
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    if (error.message.includes('Unauthorized')) {
      router.push('/401');
    } else {
      router.push('/error');
    }
  }
}

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.error-page {
  text-align: center;
  margin-top: 50px;
}
</style>