<script setup lang="ts">
import ConfettiExplosion from 'vue-confetti-explosion'

const confettiViewport = { height: window.innerHeight * 0.95, width: window.innerWidth * 0.8 }
</script>

<template>
  <div class="wrapper">
    <ConfettiExplosion
    :particleCount="300"
      :stageHeight="confettiViewport.height"
      :stageWidth="confettiViewport.width"
    />
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 80dvh;
  /* overflow-x: hidden; */
}
</style>
