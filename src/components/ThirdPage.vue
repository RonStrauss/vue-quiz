<script setup lang="ts">
import type { GridItem } from '@/types/GridItem'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

const emit = defineEmits(['changePage'])
function changePage() {
  emit('changePage', '2')
}

const counter = ref(0)

const grid1 = ref<GridItem[]>(
  [
    { orientation: 'portrait', src: getDummyPictureUrl(), id: nanoid(), isClicked: false },
    { orientation: 'portrait', src: getDummyPictureUrl(), id: nanoid(), isClicked: false },
    { orientation: 'portrait', src: getDummyPictureUrl(), id: nanoid(), isClicked: false },
    { orientation: 'landscape', src: getDummyPictureUrl(), id: nanoid(), isClicked: false },
  ],
  // .map((g: GridItem): GridItem => ({ ...g, isClicked: false, id: nanoid() })),
)

function getDummyPictureUrl() {
  return `https://i.pravatar.cc/50?img=${counter.value++ + 1}`
}
</script>

<template>
  <main>
    <div class="grid">
      <div class="grid-slot" v-for="slot of grid1" :key="slot.id">
        <img
          :src="slot.src"
          alt="Avatar"
          @click="slot.isClicked = !slot.isClicked"
          :class="{ rotated: slot.orientation === 'landscape' }"
        />
      </div>
    </div>
    <div class="grid"></div>
    <div class="grid"></div>
    <div class="grid"></div>
  </main>
</template>

<style scoped>
main{
  display: flex;
}
.grid {
  display: grid;
  /* grid-template-columns: repeat(3, 1fr); */
  gap: 10px;
  margin-bottom: 20px;
}

.grid-slot {
  width: 50px;
  height: 100px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-slot img.rotated {
  transform: rotate(90deg);
}
</style>
