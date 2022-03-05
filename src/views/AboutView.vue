<template>
  <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto flex flex-col">
    <div class="lg:w-4/6 mx-auto">
      <div class="hidden sm:block rounded-lg h-64 overflow-hidden">
        <img alt="content" class="object-cover object-center h-full w-full" src="https://res.cloudinary.com/poliweb/image/upload/c_fill,w_1200/v1640324519/HeaderPortfolio_bjo6uu.webp">
      </div>
      <div class="flex flex-col sm:flex-row mt-10">
        <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
          <div class="w-40 h-40 rounded-lg sm:rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
            <img src="https://res.cloudinary.com/poliweb/image/upload/c_fit,w_160/v1639893378/avatar_my_xrxg6d.webp" width="160" height="160" alt="Pavel Polistovskiy" class="rounded-lg sm:rounded-full inline-flex items-center justify-center">
          </div>
          <div class="flex flex-col items-center text-center justify-center">
            <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Pavel Polistovskiy</h2>
            <div class="w-12 h-1 bg-pink-600 rounded mt-2 mb-4"></div>
            <p class="text-base mb-4">Web Developer | Frontend Developer | Web Design</p>
            <div class="mx-auto"><IconButton/></div>
          </div>
        </div>
        <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
          <p class="leading-relaxed text-lg mb-4">My competence allows you to start a project with the development of a prototype and design in the Figma tool, deploy and code the project in VS Code, as well as use the Git version control system for the project. To deploy projects on the Internet, I use Netlify and Heroku servers, which allows faster delivery, simplified workflows and easy scaling.</p>
          <p class="leading-relaxed text-lg mb-4"><span class="font-bold">My professional skills:</span> FIGMA, HTML5, CSS3, JS, Vue js, Nuxt js, Laravel, GitHub, Netlify, Heroku, Cloudinary Platform. </p>
          <p class="italic mb-2">Think of me as an extension of your team.</p>
          <router-link :to="{name: 'contact'}" class="text-pink-600 inline-flex items-center">Hire Me
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script>
import IconButton from "../components/IconButton.vue";
export default {
  components: {
    IconButton,
  },
};
</script>
<style>
</style>
