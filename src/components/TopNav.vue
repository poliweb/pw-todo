<template>

  <header
    class="bg-white text-gray-600 body-font w-full shadow-md z-50 transition-transform duration-300 ease-in-out">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center space-y-4">
      <router-link :to="{ name: 'home' }" aria-label="To Home"
        class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <IconLogo />
      </router-link>
      <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-lg md:text-base justify-center">
        <router-link :to="{ name: 'home' }" replace class="mr-5 hover:text-gray-900">Home</router-link>
        <router-link :to="{ name: 'devto' }" replace class="mr-5 hover:text-gray-900">Dev To</router-link>
        <router-link :to="{ name: 'about' }" class="mr-5 hover:text-gray-900">About Me</router-link>
        <router-link :to="{ name: 'contact' }" class="mr-5 hover:text-gray-900">Сontact</router-link>
      </nav>
      <TagFilter />
    </div>
  </header>
  <template>
    <nav ref="nav">
      <IconLogo />
      <ul>
        <li><a href="#section1">Section 1</a></li>
        <li><a href="#section2">Section 2</a></li>
        <li><a href="#section3">Section 3</a></li>
      </ul>
    </nav>
    <div class="first">
      <h1>First Section</h1>
    </div>
  </template>

</template>

<script setup>
import IconLogo from './icons/IconLogo.vue';
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
    markers: true,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse();
    }
  });
});
</script>


<style scoped>
/* Анимация появления */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.7s ease, opacity 0.7s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

/* Фиксированные стили */


nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #333;
  color: white;
  z-index: 1000;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
}

.first {
  margin-top: 100px;
  height: 100vh;
  background: lightblue;
}
</style>