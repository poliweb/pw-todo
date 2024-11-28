<script setup>
import ToDo from "@/components/ToDo.vue";
import HomeTopArticles from '@/components/blocks/HomeTopArticles.vue'

</script>

<template>
  <main class="bg-white mt-[64px] lg:mt-[99px] min-h-screen">
    <div class="container mx-auto px-5 py-8 ">
      <div class="flex flex-col lg:flex-row items-start gap-24 lg:gap-10">
        <ToDo class="max-w-sm min-screen"/>
        <HomeTopArticles class="w-full"/>
      </div>
    </div>
  </main>
</template>
