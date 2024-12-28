<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { nanoid } from 'nanoid'
import type { GridRoom, PossiblePosition } from '@/types/Avatar'
import CustomIconSvg from '@/components/CustomIconSvg.vue'

const emit = defineEmits(['changePage'])
function changePage() {
  emit('changePage', '2')
}

const isDevelopment = import.meta.env.VITE_DEVELOPMENT === 'true'

// LTR
const expectedValues = {
  gridTopLeft: ['מיכאל', 'עמית', 'ליאור', 'מקסים'],
  gridTopMidLeft: ['ניר', 'יניב', 'נועה', 'ולריה'],
  gridTopMidRight: ['גל/רן', 'גל/רן', 'שלו', 'אולג', 'ולרי'],
  gridTopRight: ['רומן SRE', 'נוי', 'רפאל', 'רומן devops'],
  gridMidLeft: ['שלי', 'דין', 'אדיר', 'ויקה', 'עדי'],
  gridBottomLeft: ['מעיין', 'רון', 'אנאן', 'מעיין קנטור'],
}

const initialState = {
  gridTopLeft: ['', 'עמית', '', 'מקסים'],
  gridTopMidLeft: ['', 'יניב', 'נועה', ''],
  gridTopMidRight: ['', '', 'שלו', 'אולג', 'ולרי'],
  gridTopRight: ['', 'נוי', 'רפאל', ''],
  gridMidLeft: ['שלי', '', 'אדיר', 'ויקה', 'עדי'],
  gridBottomLeft: ['', 'רון', '', 'מעיין קנטור'],
}

const areInputsCorrect = computed(() => {
  return (
    joinAndCompareGridSlots(gridTopLeft.value, expectedValues.gridTopLeft) &&
    joinAndCompareGridSlots(gridTopMidLeft.value, expectedValues.gridTopMidLeft) &&
    joinAndCompareGridSlots(gridTopMidRight.value, expectedValues.gridTopMidRight, true) &&
    joinAndCompareGridSlots(gridTopRight.value, expectedValues.gridTopRight) &&
    joinAndCompareGridSlots(gridMidLeft.value, expectedValues.gridMidLeft) &&
    joinAndCompareGridSlots(gridBottomLeft.value, expectedValues.gridBottomLeft)
  )
})
const gridTopLeft = ref<GridRoom[]>(getInitialStateArray('gridTopLeft'))
const gridTopMidLeft = ref<GridRoom[]>(getInitialStateArray('gridTopMidLeft'))
const gridTopMidRight = ref<GridRoom[]>(getInitialStateArray('gridTopMidRight'))
const gridTopRight = ref<GridRoom[]>(getInitialStateArray('gridTopRight'))
const gridMidLeft = ref<GridRoom[]>(getInitialStateArray('gridMidLeft'))
const gridBottomLeft = ref<GridRoom[]>(getInitialStateArray('gridBottomLeft'))

watch(areInputsCorrect, (newVal) => {
  if (newVal) {
    changePage()
  }
})
function changeValuesInGridSlots(e: Event, i: number, position: PossiblePosition) {
  let grid = gridTopLeft
  switch (position) {
    case 'TopLeft':
      grid = gridTopLeft
      break
    case 'TopMidLeft':
      grid = gridTopMidLeft
      break
    case 'TopMidRight':
      grid = gridTopMidRight
      break
    case 'TopRight':
      grid = gridTopRight
      break
    case 'MidLeft':
      grid = gridMidLeft
      break
    case 'BottomLeft':
      grid = gridBottomLeft
      break
    default:
      break
  }
  const gridSlot = grid.value[i]
  grid.value = [
    ...grid.value.slice(0, i),
    { ...gridSlot, innerValue: (e.target as HTMLInputElement).value },
    ...grid.value.slice(i + 1),
  ]
}

function getInitialStateArray(key: keyof typeof initialState) {
  return initialState[key].map((name) => ({
    id: nanoid(),
    innerValue: name,
    readonly: name !== '',
  }))
}

function joinAndCompareGridSlots(
  gridSlots: GridRoom[],
  expectedValues: string[],
  isSpecialCase = false,
) {
  let grid = gridSlots,
    expected = expectedValues

  if (isSpecialCase) {
    grid = grid.slice(2)
    expected = expected.slice(2)
  }
  let expression =
    grid
      .map((slot) => slot.innerValue)
      .join('')
      .trim()
      .toLowerCase() === expected.join('').toLowerCase()

  if (isSpecialCase) {
    expression &&=
      (gridSlots[0].innerValue === 'גל' && gridSlots[1].innerValue === 'רן') ||
      (gridSlots[0].innerValue === 'רן' && gridSlots[1].innerValue === 'גל')
  }

  return expression
}

function developerFunctionFillAllExpectedValues() {
  gridTopLeft.value = expectedValues.gridTopLeft.map((name) => ({
    id: nanoid(),
    readonly: false,
    innerValue: name,
  }))
  gridTopMidLeft.value = expectedValues.gridTopMidLeft.map((name) => ({
    id: nanoid(),
    readonly: false,
    innerValue: name,
  }))
  gridTopMidRight.value = expectedValues.gridTopMidRight.map((name) => ({
    id: nanoid(),
    innerValue: name,
    readonly: false,
  }))
  gridTopRight.value = expectedValues.gridTopRight.map((name) => ({
    id: nanoid(),
    innerValue: name,
    readonly: false,
  }))
  gridMidLeft.value = expectedValues.gridMidLeft.map((name) => ({
    id: nanoid(),
    innerValue: name,
    readonly: false,
  }))
  gridBottomLeft.value = expectedValues.gridBottomLeft.map((name) => ({
    id: nanoid(),
    readonly: false,
    innerValue: name,
  }))
}
</script>

<template>
  <div class="wrapper">
    <div class="row">
      <div class="grid">
        <div class="window-wrapper">
          <CustomIconSvg src="window" />
          <CustomIconSvg src="window" />
        </div>
        <input
          v-for="(slot, i) in gridTopLeft"
          :key="slot.id"
          class="grid-slot"
          type="text"
          :value="slot.innerValue"
          :readonly="slot.readonly"
          @input="(e) => changeValuesInGridSlots(e, i, 'TopLeft')"
        />
      </div>
      <div class="grid">
        <div class="window-wrapper">
          <CustomIconSvg src="window" />
          <CustomIconSvg src="window" />
        </div>
        <input
          v-for="(slot, i) in gridTopMidLeft"
          :key="slot.id"
          class="grid-slot"
          type="text"
          :value="slot.innerValue"
          :readonly="slot.readonly"
          @input="(e) => changeValuesInGridSlots(e, i, 'TopMidLeft')"
        />
      </div>
      <div class="grid">
        <div class="window-wrapper">
          <CustomIconSvg src="window" />
          <CustomIconSvg src="window" />
        </div>
        <input
          v-for="(slot, i) in gridTopMidRight"
          :key="slot.id"
          class="grid-slot"
          type="text"
          :value="slot.innerValue"
          :readonly="slot.readonly"
          @input="(e) => changeValuesInGridSlots(e, i, 'TopMidRight')"
        />
      </div>
      <div class="grid">
        <div class="window-wrapper">
          <CustomIconSvg src="window" />
          <CustomIconSvg src="window" />
        </div>
        <input
          v-for="(slot, i) in gridTopRight"
          :key="slot.id"
          class="grid-slot"
          type="text"
          :value="slot.innerValue"
          :readonly="slot.readonly"
          @input="(e) => changeValuesInGridSlots(e, i, 'TopRight')"
        />
      </div>
    </div>
    <div class="row">
      <div class="row-left">
        <div class="grid">
          <div class="window-wrapper">
            <CustomIconSvg src="window" />
            <CustomIconSvg src="window" />
          </div>
          <input
            v-for="(slot, i) in gridMidLeft"
            :key="slot.id"
            class="grid-slot"
            type="text"
            :value="slot.innerValue"
            :readonly="slot.readonly"
            @input="(e) => changeValuesInGridSlots(e, i, 'MidLeft')"
          />
        </div>
        <div class="grid" style="padding: 40px 20px 20px 80px">
          <div class="window-wrapper">
            <CustomIconSvg src="window" />
            <CustomIconSvg src="window" />
          </div>
          <div class="coffee-wrapper">
            <!-- <span>קפה</span> -->
            <CustomIconSvg src="coffee-machine" />
          </div>
          <input
            v-for="(slot, i) in gridBottomLeft"
            :key="slot.id"
            class="grid-slot"
            type="text"
            :value="slot.innerValue"
            :readonly="slot.readonly"
            @input="(e) => changeValuesInGridSlots(e, i, 'BottomLeft')"
          />
        </div>
      </div>
      <div class="row-right">
        <div class="text">
          <p>
            בואו נעשה קצת בלגן!!! החלטתי לערבב את כל החדרים. עכשיו זה הזמן לארגון מחדש. אבל אתם לא
            חושבים שזה יהיה כל כך קל...
          </p>
          <ol>
            <li v-for="(instruction, i) in instructions" :key="i">{{ instruction }}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>

  <button v-if="isDevelopment" @click="developerFunctionFillAllExpectedValues">המשך</button>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;
  /* justify-content: space-between; */
  width: 100%;
}

.row {
  display: flex;
  justify-content: space-between;
  direction: ltr;
  /* margin-bottom: 20px; */
}
.row-left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.grid {
  display: grid;
  position: relative;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  gap: 20px;
  background: url('@/assets/images/parquet.jpg');
  background-size: cover;
  padding: 40px 20px 20px;
  background-color: rgb(171 255 255);
  background-blend-mode: darken;
}
.grid-slot {
  width: 100px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
/*
.grid-slot input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
} */
.grid-slot:read-only {
  background-color: #7d7d7d;
  color: white;
}

.window-wrapper {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.coffee-wrapper {
  position: absolute;
  bottom: 1rem;
  left: 10px;
}

.window-wrapper span,
.coffee-wrapper span {
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
}

.text {
  direction: rtl;
  text-wrap: balance;
}
.text p {
  margin-bottom: 1rem;
}
</style>

<script lang="ts">
const instructions = [
  'כל המנהלים יושבים ליד החלון (גם ה tech lead)',
  ' אנשים שיש להם אותו שם ישבו באותו החדר. למה? כי אני יכול וזה מצחיק אותי.',
  ' מאותה סיבה אנשים עם שם בעל שני אותיות ישבו באותו החדר.',
  ' ולריה וניר חייבים לשבת באותו חדר כדי שיהיה לולריה למי להציק.',
  ' עמית ומיכאל חייבים לשבת יחד כי מיכאל ממש אוהב את השירים שעמית שם במיוחד בשבילו',
  ' רומן יישב בחדר עם נוי',
  ' נועה וניר הולכים לעבוד על JDI מגניב יחד, אז כדאי שישבו באותו החדר.',
  ' אנאן אחראי על מכונת הקפה הצוותית.',
  ' דין חייב לשבת ליד חלון ואין מצב שהוא ואדיר נפרדים.',
]
</script>
