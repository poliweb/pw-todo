<template>
  <section class="bg-white text-gray-600 body-font relative">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Me</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn
          asymmetrical gentrify.</p>
      </div>
      <div class="lg:w-1/2 md:w-2/3 mx-auto">
        <form action="https://submit-form.com/gw1EfX6WF">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                <input type="text" id="name" name="name"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                <input type="email" id="email" name="email"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                <textarea id="message" name="message"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
              </div>
            </div>
            <input type="hidden" name="_redirect" value="https://todo.poliweb.su/thanks" />
            <div class="p-2 w-full">
              <button type="submit"
                class="flex mx-auto text-white bg-pink-600 border-0 py-2 px-8 focus:outline-none hover:bg-pink-500 rounded text-lg">
                Submit
              </button>
            </div>
          </div>
        </form>
        <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
          <a href="tel:+77017211284" class="text-pink-600">+7 701 721 1284</a>
          <p class="leading-normal my-5">Alma-Ata
            <br>Kazakhstan
          </p>

          <IconButton class="inline-flex" />
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

<style></style>