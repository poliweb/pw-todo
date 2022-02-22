<template>
  <footer class="bg-pink-100 body-font">
  <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <router-link :to="{name: 'home'}" class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
      <IconLogo class="w-24"/>
    </router-link> 
    <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© {{ new Date().getFullYear() }}  Web Developer —
      <a href="https://github.com/poliweb" class="text-pink-600 ml-1" rel="noopener noreferrer" target="_blank">@poliweb</a>
    </p>
    <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <IconButton/>
    </span>
  </div>
</footer>
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

<style>
</style>