<script setup lang="ts">
import { ref } from 'vue'
let currentPage = ref<'0' | '1' | '2' | '3' | '4'>('0')
import FirstPage from './components/FirstPage.vue'
import SecondPage from './components/SecondPage.vue'

function handleChangePage(newPage: typeof currentPage.value) {
  currentPage.value = newPage
}
</script>

<template>
  <header>החידה הגדולה</header>

  <main dir="rtl">
    <FirstPage v-if="currentPage === '0'" @change-page="handleChangePage" />
    <SecondPage v-else-if="currentPage === '1'" />
  </main>
</template>

<style scoped>
header {
  text-align: center;
  font-size: x-large;
}
main {
  display: grid;
  place-items: center;
  flex: 1;
}
</style>
