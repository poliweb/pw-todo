<template>
  <nav ref="nav">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center space-y-4">
      <router-link :to="{ name: 'home' }" aria-label="To Home"
        class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <IconLogo />
      </router-link>
      <div class="md:ml-auto md:mr-auto flex flex-wrap items-center text-lg md:text-base justify-center">
        <router-link :to="{ name: 'home' }" replace class="nav-link mr-5">Home</router-link>
        <router-link :to="{ name: 'devto' }" replace class="nav-link mr-5">Dev To</router-link>
        <router-link :to="{ name: 'about' }" class="nav-link mr-5">About Me</router-link>
        <router-link :to="{ name: 'contact' }" class="nav-link mr-5">Сontact</router-link>
      </div>
      <TagFilter />
    </div>
  </nav>
  <div class="first">
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IconLogo from './icons/IconLogo.vue';
import TagFilter from './TagFilter.vue';



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

/* Настройка тега А в меню */
a.nav-link {
  color: dimgrey !important;
  text-decoration: none;
  position: relative;
}
/* Тег А в активном састояние класс router-link-exact-active */
a.router-link-exact-active.nav-link {
  color: #ec4899 !important;
}
a.router-link-exact-active.nav-link:after {
  left: 0;
  width: 100%;
  position: relative;
}
/* Настройка поведения Тег А при состояние псевдокласса :hover */
a.nav-link:hover {
  color: #ec4899 !important;
}
a.nav-link:after {
  bottom: 0;
  content: "";
  display: block;
  height: 2px;
  left: 50%;
  position: absolute;
  background: #ec4899;
  transition: width 0.4s ease 0s, left 0.4s ease 0s;
  width: 0;
}
a.nav-link:hover:after {
  width: 100%;
  left: 0;
}
</style>