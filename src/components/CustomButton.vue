<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'

defineProps({
  text: String,
})

const emit = defineEmits(['clicked'])
function clicked() {
  emit('clicked', true)
}
</script>

<template>
  <button @click="clicked">{{ text }}</button>
</template>

<style scoped>
/* video {
  width: 100%;
  height: 70%;
} */
button {
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #f0f0f0;
  cursor: pointer;
  border: 1px solid var(--color-border);
  outline: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}
button:hover {
  background-color: #e0e0e0;
}
</style>
