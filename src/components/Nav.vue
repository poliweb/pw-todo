<template>

  <nav ref="nav">

    <!-- Disctop menu-->
    <div class="container  p-5  mx-auto hidden lg:flex lg:flex-row items-center space-y-4">

      <!-- Logo Type -->
      <router-link :to="{ name: 'home' }" aria-label="To Home"
        class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <IconLogo />
      </router-link>

      <!-- Navigation links -->
      <div class="md:ml-auto md:mr-auto flex flex-wrap items-center text-lg md:text-base justify-center">
        <NavRouterLink />
      </div>

      <!-- Tag filter -->
      <TagFilter />

    </div>

    <!-- Mobale menu -->
    <div class="container mx-auto flex flex-row p-2 items-center justify-between gap-x-4 lg:hidden">

      <!-- Logo Type -->
      <router-link :to="{ name: 'home' }" aria-label="To Home"
        class="flex title-font font-medium items-center text-gray-900 mb-0">
        <IconLogo class="w-24" />
      </router-link>

      <!-- Tag filter -->
      <TagFilter class="w-full md:w-auto" />

      <!-- Burger Button -->
      <button @click="toggleMenu"
        class="w-[34px] h-[40px] bg-pink-500 rounded flex flex-col items-center justify-center gap-2 px-2 relative">
        <span v-for="i in 3" :key="i" :class="[
          'w-[20px] h-[2px] bg-white transition-all duration-300 ease-in-out',
          {
            'rotate-45 absolute top-[47%]': isMenuOpen && i === 1,
            'opacity-0 element': isMenuOpen && i === 2,
            '-rotate-45 absolute bottom-[47%]': isMenuOpen && i === 3,
            'rotate-0 absolute top-3.5': !isMenuOpen && i === 1,
            'elementOut': !isMenuOpen && i === 2,
            'rotate-0 absolute bottom-3.5': !isMenuOpen && i === 3
          }
        ]"></span>
      </button>

    </div>
    <!-- Выпадающее меню -->
    <transition name="slide">
      <div v-if="isMenuOpen" @click.stop
        class="absolute top-full left-0 w-full bg-pink-100 shadow-lg p-4 z-50 lg:hidden">
        <div class="flex flex-col sm:flex-row  gap-y-6">
          <NavRouterLink :onCloseMenu="toggleMenu" />
        </div>
      </div>
    </transition>

  </nav>
  <div class="first">
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IconLogo from './icons/IconLogo.vue';
import TagFilter from './TagFilter.vue';
import NavRouterLink from './NavRouterLink.vue';

// Управление состоянием меню
const isMenuOpen = ref(false);

const toggleMenu = (event) => {
  if (event && event.stopPropagation) {
    event.stopPropagation(); // Останавливаем всплытие, если событие доступно
  }
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handleDocumentClick = () => {
  closeMenu(); // Закрываем меню при клике вне его
};

gsap.registerPlugin(ScrollTrigger);

const nav = ref(null);

onMounted(() => {
  const showAnim = gsap.from(nav.value, {
    yPercent: -100,
    paused: true,
    duration: 0.5,
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

  document.addEventListener('click', handleOutsideClick);

});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});


const handleOutsideClick = (event) => {
  if (!event.target.closest('.menu-dropdown') && isMenuOpen.value) {
    isMenuOpen.value = false;
  }
};
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

/* Плавное появление меню */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Animation */
@keyframes exampleAnimationIn {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateX(20px);
    opacity: 0.5;
  }
  100% {
    transform: translateX(45px);
    opacity: 0;
  }
}

@keyframes exampleAnimationOut {
  0% {
    transform: translateX(45px);
    opacity: 0;
  }
  50% {
    transform: translateX(20px);
    opacity: 0.5;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.element {
  background-color: #fff;
  animation: exampleAnimationIn 0.5s ease-in-out;
}

.elementOut {
  background-color: #fff;
  animation: exampleAnimationOut 0.5s ease-in-out;
}
</style>