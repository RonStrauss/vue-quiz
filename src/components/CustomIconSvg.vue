<script lang="ts" setup>
import type { Icons } from '@/types/Icons'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  src: Icons
}>()

const iconPath = ref('')

watchEffect(async () => {
  const module = await import(`@/assets/icons/${props.src}-svgrepo-com.svg`)
  iconPath.value = module.default
})
</script>

<template>
  <img :class="props.src" :src="iconPath" />
</template>

<style scoped>
img {
  width: 50px;
  user-select: none;
}

.window {
  transform: perspective(75px) rotateX(-67deg);
}

.coffee-machine {
  transform: perspective(102px) rotateY(36deg) rotateX(8deg) rotateZ(-75deg);
}
</style>
