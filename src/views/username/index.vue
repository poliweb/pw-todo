<template>
    <section class="text-gray-600 body-font mt-[64px] lg:mt-[99px]">
        <div class="container px-5 py-5 md:py-24 mx-auto flex flex-col">
            <div class="w-full  mx-auto">
                <div class="flex flex-col md:flex-row mt-10">
                    <div class="md:w-1/3 text-center md:pr-8 md:py-8">
                        <!-- Avatar -->
                        <UsernameBlock />
                    </div>
                    <div
                        class="md:w-2/3 md:pl-8 md:py-8 md:border-l border-gray-200 md:border-t-0 border-t mt-4 pt-4 md:mt-0 text-center md:text-left">
                        <UsernameArticlesBlock />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import UsernameBlock from '@/components/blocks/UsernameBlock.vue'
import UsernameArticlesBlock from '@/components/blocks/UsernameArticlesBlock.vue'

const router = useRouter();

function goToNotFound() {
  router.push('/404');
}

</script>

<style scoped></style>
