<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
  <header class="bg-white text-gray-600 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center space-y-4">
    <router-link :to="{name: 'home'}" aria-label="To Home" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <IconLogo/>
    </router-link>
    <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-lg md:text-base justify-center">
      <router-link :to="{name: 'home'}" replace class="mr-5 hover:text-gray-900 ">Home</router-link>
      <router-link :to="{name: 'about'}" class="mr-5 hover:text-gray-900">About Me</router-link>
      <router-link :to="{name: 'contact'}" class="mr-5 hover:text-gray-900">Сontact</router-link>

    </nav>
    <!-- <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button> -->
    <IconButton/>
  </div>
</header>
</template>

<script>
import IconLogo from "./icons/IconLogo.vue";
import IconButton from "./IconButton.vue";
export default {
  components: {
    IconLogo,
    IconButton,
  },
};
</script>

<style scoped>
a.router-link-active.router-link-exact-active {
  color: #db2777;
}
</style>