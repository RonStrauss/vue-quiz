<script setup lang="ts">
import { computed, ref } from 'vue'
import FirstPage from './components/FirstPage.vue'
import SecondPage from './components/SecondPage.vue'
import ThirdPage from './components/ThirdPage.vue'
import FourthPage from './components/FourthPage.vue'
import FifthPage from './components/FifthPage.vue'

const currentPage = ref<'0' | '1' | '2' | '3' | '4'>('0')

function handleChangePage(newPage: typeof currentPage.value) {
  currentPage.value = newPage
}

const title = computed(() => {
  switch (currentPage.value) {
    case '0':
      return 'SaaS Platformania'
    case '1':
      return 'SaaS Platform mish-mash'
    case '2':
      return 'החידה השלישית'
    case '3':
      return 'החידה הרביעית'
    default:
      return 'ניצחתם!'
  }
})
</script>

<template>
  <header>{{ title }}</header>

  <main dir="rtl">
    <FirstPage v-if="currentPage === '0'" @change-page="handleChangePage" />
    <SecondPage v-else-if="currentPage === '1'" @change-page="handleChangePage" />
    <ThirdPage v-else-if="currentPage === '2'" @change-page="handleChangePage" />
    <FourthPage v-else-if="currentPage === '3'" @change-page="handleChangePage" />
    <FifthPage v-else-if="currentPage === '4'" />
    <button @click="() => handleChangePage('1')">SecondPage</button>
    <button  @click="() => handleChangePage('2')">ThirdPage</button>
    <button  @click="() => handleChangePage('3')">FourthPage</button>
    <button  @click="() => handleChangePage('4')">FifthPage</button>
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
