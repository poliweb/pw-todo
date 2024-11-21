<template>
    <section>
        <div class="container px-5 py-24 mx-auto mt-[99px]">
            <div class="error-page py-48">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-500">404 - Page Not Found</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base mb-8">Sorry, but the page you are looking for does not exist.</p>
                <router-link to="/" class="btn-primary">Go to the home page</router-link>
            </div>
        </div>
    </section>
</template>

<script setup>

</script>

<style scoped>
.error-page {
  text-align: center;
  margin-top: 50px;
}
</style>