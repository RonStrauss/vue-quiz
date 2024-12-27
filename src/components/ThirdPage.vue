<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const emit = defineEmits(['changePage'])
function changePage() {
  emit('changePage', '3')
}

const expectedValue = '3429'
const inputs = ref(['', '', '', ''])
const concatenatedInputs = computed(() => inputs.value.join(''))

watch(concatenatedInputs, (newVal) => {
  if (newVal === expectedValue) {
    changePage()
  }
})
</script>

<template>
  <section dir="ltr">
    <div class="img-wrapper">
      <div class="top">
        <h2>Rockets 2</h2>
        <img src="@/assets/images/rockets2.jpg" alt="rockets2" />
      </div>
      <div class="bottom">
        <input v-model="inputs[0]" type="text" />
      </div>
    </div>
    <div class="img-wrapper">
      <div class="top">
        <h2>Rockets 3 + Falcon 3</h2>
        <img src="@/assets/images/rockets3_falcon3.jpg" alt="rockets3_falcon3" />
      </div>
      <div class="bottom">
        <input v-model="inputs[1]" type="text" />
      </div>
    </div>
    <div class="img-wrapper">
      <div class="top">
        <h2>Falcon 2</h2>
        <img src="@/assets/images/falcon2.jpg" alt="falcon2" />
      </div>
      <div class="bottom">
        <input v-model="inputs[2]" type="text" />
      </div>
    </div>
    <div class="img-wrapper">
      <div class="top">
        <h2>Rockets 1 + SRE + Managers</h2>
        <img src="@/assets/images/rockets1_sre_managers.jpg" alt="rockets1_sre_managers" />
      </div>
      <div class="bottom">
        <input v-model="inputs[3]" type="text" />
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
}
.img-wrapper {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.img-wrapper img {
  width: 100%;
}
.img-wrapper .top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
}
.img-wrapper .bottom input {
  width: 3rem;
  text-align: center;
}
</style>
