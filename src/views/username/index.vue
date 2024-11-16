<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-col">
            <div class="lg:w-5/6 mx-auto">
                <div class="flex flex-col sm:flex-row mt-10">
                    <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                        <!-- Avatar -->
                        <UsernameBlock />
                    </div>
                    <div
                        class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                        <UsernameArticlesBlock />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import UsernameBlock from '@/components/blocks/UsernameBlock.vue'
import UsernameArticlesBlock from '@/components/blocks/UsernameArticlesBlock.vue'

</script>

<style scoped></style>
