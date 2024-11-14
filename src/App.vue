<script setup>
import { RouterLink, RouterView } from "vue-router";
import TopNav from "./components/TopNav.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <TopNav />
  <RouterView />
  <Footer />
</template>

<style>
@import "@/assets/base.css";
</style>
