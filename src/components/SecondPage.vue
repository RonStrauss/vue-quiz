<script lang="ts" setup>
import { defineEmits, ref } from 'vue'
import { nanoid } from 'nanoid'
import type { Avatar } from '@/types/Avatar'

const emit = defineEmits(['changePage'])
function changePage() {
  emit('changePage', '2')
}

const gridSlots = ref<string[]>(new Array(9).fill(nanoid()))
</script>

<template>
  <h3>SaaS Platform mish-mash</h3>
  <p>
    על 7 חדרים בקומה השתלטה כיום קבוצת הפלטפורמה. אנחנו הולכים לעשות קצת ארגון מחדש ולערבב קצת
    בין הצוותים בחדרים.
  </p>
  <div class="grid">
    <div v-for="id in gridSlots" :key="id" class="grid-slot">
      <input type="text" />
    </div>
  </div>

  <!-- <draggable class="grid" v-model="gridSlots" tag="div" :animation="300" group="avatars">
    <template #item="{ element: avatar }">
      <img class="grid-slot" :src="avatar?.url" alt="Avatar" />
    </template>
  </draggable> -->
</template>

<style scoped>
.avatars {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.avatar {
  width: 50px;
  height: 50px;
  cursor: grab;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.grid-slot {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.grid-slot img {
  width: 100%;
  height: 100%;
}

.grid-slot input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  text-align: center;
}
</style>

<!-- <script lang="ts">
export default {
  data() {
    return {
      avatars: new Array(9)
        .fill(0)
        .map((_, i) => ({ url: `https://i.pravatar.cc/50?img=${i + 1}`, id: nanoid(), list: 0 })),
      gridSlots: new Array(9).fill(null),
    }
  },
}
</script> -->
