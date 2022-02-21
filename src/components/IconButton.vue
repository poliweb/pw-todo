<template>
  <div class="">
      <ul class="flex flex-wrap items-center space-x-3">
          <li class=""><a href="https://github.com/poliweb" target="_blank" class="text-pink-600 hover:text-pink-500 "><IconGithub/></a></li>
          <li class=""><a href="https://dribbble.com/PoliWeb" target="_blank" class="text-pink-600 hover:text-pink-500 "><IconDribbble/></a></li>
          <li class=""><a href="https://codepen.io/poliweb" target="_blank" class="text-pink-600 hover:text-pink-500 "><IconCodepen/></a></li>
          <li class=""><a href="https://www.behance.net/poliweb" target="_blank" class="text-pink-600 hover:text-pink-500 "><IconBehance/></a></li>
          <li class=""><a href="https://www.linkedin.com/in/poliweb/" target="_blank" class="text-pink-600 hover:text-pink-500 "><IconLinkedin/></a></li>
      </ul>
  </div>
</template>

<script>
import IconGithub from "./icons/IconGithub.vue";
import IconDribbble from "./icons/IconDribbble.vue";
import IconCodepen from "./icons/IconGithub.vue";
import IconBehance from "./icons/IconBehance.vue";
import IconLinkedin from "./icons/IconLinkedin.vue";
export default {
  components: {
    IconGithub,
    IconDribbble,
    IconCodepen,
    IconBehance,
    IconLinkedin,
  },
};
</script>

<style>
</style>