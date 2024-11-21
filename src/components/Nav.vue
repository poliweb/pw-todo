<template>
  <nav ref="nav">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center space-y-4">
      <router-link :to="{ name: 'home' }" aria-label="To Home"
        class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <IconLogo />
      </router-link>
      <div class="md:ml-auto md:mr-auto flex flex-wrap items-center text-lg md:text-base justify-center">
        <router-link :to="{ name: 'home' }" replace class="mr-5 hover:text-gray-900">Home</router-link>
        <router-link :to="{ name: 'devto' }" replace class="mr-5 hover:text-gray-900">Dev To</router-link>
        <router-link :to="{ name: 'about' }" class="mr-5 hover:text-gray-900">About Me</router-link>
        <router-link :to="{ name: 'contact' }" class="mr-5 hover:text-gray-900">Сontact</router-link>
      </div>
      <TagFilter />
    </div>
  </nav>
  <div class="first">
  </div>
</template>

<script setup>
import IconLogo from './icons/IconLogo.vue';
import TagFilter from './TagFilter.vue';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ref, onMounted } from 'vue';

gsap.registerPlugin(ScrollTrigger);

const nav = ref(null);

onMounted(() => {
  const showAnim = gsap.from(nav.value, { 
    yPercent: -100,
    paused: true,
    duration: 0.2,
  }).progress(1);

  ScrollTrigger.create({
    trigger: ".first",
    start: "top top",
    end: 99999,
    // markers: true,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse();
    }
  });
});
</script>


<style scoped>
a.router-link-active.router-link-exact-active {
  color: #db2777;
}

/* Добавьте базовые стили */
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1000;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(0);
}


.first {
  margin-top: 0px;
  background: lightblue;
}
</style>