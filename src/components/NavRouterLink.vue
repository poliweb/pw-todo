<template>
    <router-link
      v-for="(link, index) in navLinks"
      :key="index"
      :to="{ name: link.name }"
      class="nav-link mr-5"
      @click="handleClick"
    >
      {{ link.text }}
    </router-link>
</template>

<script setup>
const props = defineProps({
  onCloseMenu: {
    type: Function,
    required: false, // Делать необязательной, если компонент может использоваться без меню
  },
});


const navLinks = [
  { name: 'home', text: 'Home' },
  { name: 'devto', text: 'Dev To' },
  { name: 'about', text: 'About Me' },
  { name: 'contact', text: 'Contact' },
];



// Локальная обработка клика
const handleClick = (event) => {
  if (props.onCloseMenu) {
    props.onCloseMenu(event); // Передаём объект события
  }
};
</script>

<style scoped>
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