<script setup lang="ts">
const currentPage: '0' | '1' | '2' | '3' | '4' = '0'
import FirstPage from './components/FirstPage.vue'
</script>

<template>
  <header>החידה הגדולה</header>

  <main>
    <FirstPage v-if="currentPage === '0'" />
  </main>
</template>

<style scoped></style>
