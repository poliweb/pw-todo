<template>
    <div class="flex flex-row justify-center items-center gap-1 md:gap-4">
        <input @keyup.enter="handleEnter" type="text" v-model="message" placeholder="write a tag"
            class="bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 w-full md:w-auto transition-colors duration-200 ease-in-out" />
        <router-link v-if="message" :key="lowerCasedMessage" :to="'/tag/' + lowerCasedMessage" class="btn-primary hidden md:block" @click="clearMessage">
            <span class="uppercase">Search tag</span> #{{ lowerCasedMessage }}
        </router-link>
        <router-link v-if="message" :key="lowerCasedMessage" :to="'/tag/' + lowerCasedMessage" class="btn-mobile md:hidden" @click="clearMessage">
            <span class="uppercase">
                <IconSearch class="w-6 h-6"/>
            </span>
        </router-link>
    </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import { useRouter } from 'vue-router'; // импортируем useRouter
import IconSearch from './icons/IconSearch.vue';


const message = ref('');
const router = useRouter(); // инициализация router

const lowerCasedMessage = computed(() => {
    return message.value.trim().replace(/\s+/g, '').toLowerCase();
});

function handleEnter() {
    if (lowerCasedMessage.value) {
        // Переход по роутеру при нажатии Enter
        router.push('/tag/' + lowerCasedMessage.value);
    }
    // Очистка поля ввода после @keyup.enter="handleEnter" и навигации
    message.value = '';
}
function clearMessage() {
    // Очистка поля ввода при клике на ссылку router-link
    message.value = '';
}
</script>

<style scoped>
.btn-primary {
    @apply text-white bg-pink-500 border-0 shadow-lg shadow-pink-500/50 hover:shadow-pink-700/50 py-2 px-6 focus:outline-none hover:bg-pink-700 rounded text-lg transition duration-300 ease-in-out;
}
.btn-mobile {
    @apply text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-700 rounded text-lg transition duration-300 ease-in-out;
}
</style>