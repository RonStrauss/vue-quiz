<script setup lang="ts">
import { computed, ref } from 'vue'
const currentPage = ref<'0' | '1' | '2' | '3' | '4'>('0')
import FirstPage from './components/FirstPage.vue'
import SecondPage from './components/SecondPage.vue'
import ThirdPage from './components/ThirdPage.vue'

function handleChangePage(newPage: typeof currentPage.value) {
  currentPage.value = newPage
}

const title = computed(() => {
  switch (currentPage.value) {
    case '0':
      return 'החידה הגדולה'
    case '1':
      return 'SaaS Platform mish-mash'
    case '2':
      return 'החידה השלישית'
    default:
      return 'הסוף'
  }
})
</script>

<template>
  <header>{{title}}</header>

  <main dir="rtl">
    <FirstPage v-if="currentPage === '0'" @change-page="handleChangePage" />
    <SecondPage v-else-if="currentPage === '1'" @change-page="handleChangePage" />
    <ThirdPage v-else-if="currentPage === '2'" @change-page="handleChangePage" />
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
