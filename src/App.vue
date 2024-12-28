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

const isDevelopment = import.meta.env.VITE_DEVELOPMENT === 'true'

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

const instructions = computed(() => {
  switch (currentPage.value) {
    case '0':
      return ''
    case '1':
      return `  בואו ניקח את שיתוף הפעולה צעד אחד קדימה. החלטתי לערבב את החדרים מחדש. מקמו את חברי הצוות במקומות
    המתאימים להם כדי לעבור לשלב הבא.`
    case '2':
      return `כדי לעבור לחידה הבאה תצטרכו קוד בין 4 ספרות, שאותו החבאתי בתמונות הילדות שלכם.
זה הזמן להשתמש בדפי העזר והטושים שקיבלתם.
אם תצטרכו עוד, שמרתי קצת בצד אצל מעיין.`
    case '3':
      return `איך אני אוהב לפענח כתב סתרים.
עכשיו נראה אתכם מסתדרים בלעדיי`
    default:
      return `חפשו את הנרות מתחת לשולחן המרצה 😁`
  }
})
</script>

<template>
  <header>
    <h1 class="title">{{ title }}</h1>
    <h3 class="instructions">{{ instructions }}</h3>
  </header>

  <main dir="rtl">
    <FirstPage v-if="currentPage === '0'" @change-page="handleChangePage" />
    <SecondPage v-else-if="currentPage === '1'" @change-page="handleChangePage" />
    <ThirdPage v-else-if="currentPage === '2'" @change-page="handleChangePage" />
    <FourthPage v-else-if="currentPage === '3'" @change-page="handleChangePage" />
    <FifthPage v-else-if="currentPage === '4'" />
    <template v-if="isDevelopment">
      <button @click="() => handleChangePage('1')">SecondPage</button>
      <button @click="() => handleChangePage('2')">ThirdPage</button>
      <button @click="() => handleChangePage('3')">FourthPage</button>
      <button @click="() => handleChangePage('4')">FifthPage</button>
    </template>
  </main>
</template>

<style scoped>
header {
  text-align: center;
  direction: rtl;
  text-wrap: balance;
}
main {
  display: grid;
  place-items: center;
  flex: 1;
}

.title {
  font-size: x-large;
}
</style>
