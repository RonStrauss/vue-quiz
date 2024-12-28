<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { nanoid } from 'nanoid'
import type { GridRoom } from '@/types/Avatar'
import CustomIconSvg from '@/components/CustomIconSvg.vue'
import draggable from 'vuedraggable'
import { type SortableEvent } from 'sortablejs'

type NameList = {
  name: string
}

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
const list1 = ref<NameList[]>(
  [
    { name: 'מיכאל' },
    { name: 'ליאור' },
    { name: 'ניר' },
    { name: 'ולריה' },
    { name: 'רן' },
    { name: 'גל' },
    { name: 'רומן SRE' },
    { name: 'רומן devops' },
    { name: 'דין' },
    { name: 'מעיין' },
    { name: 'אנאן' },
  ].sort(() => Math.random() - 0.5),
)
const nameLists = {
  list2: ref<NameList[]>([]),
  list3: ref<NameList[]>([]),
  list4: ref<NameList[]>([]),
  list5: ref<NameList[]>([]),
  list6: ref<NameList[]>([]),
  list7: ref<NameList[]>([]),
  list8: ref<NameList[]>([]),
  list9: ref<NameList[]>([]),
  list10: ref<NameList[]>([]),
  list11: ref<NameList[]>([]),
  list12: ref<NameList[]>([]),
}

const initialState = {
  gridTopLeft: ['list2', 'עמית', 'list3', 'מקסים'],
  gridTopMidLeft: ['list4', 'יניב', 'נועה', 'list5'],
  gridTopMidRight: ['list6', 'list7', 'שלו', 'אולג', 'ולרי'],
  gridTopRight: ['list8', 'נוי', 'רפאל', 'list9'],
  gridMidLeft: ['שלי', 'list10', 'אדיר', 'ויקה', 'עדי'],
  gridBottomLeft: ['list11', 'רון', 'list12', 'מעיין קנטור'],
}

const areInputsCorrect = computed(() => {
  const { list2, list3, list4, list5, list6, list7, list8, list9, list10, list11, list12 } =
    nameLists
  return (
    list2.value[0]?.name === expectedValues.gridTopLeft[0] &&
    list3.value[0]?.name === expectedValues.gridTopLeft[2] &&
    list4.value[0]?.name === expectedValues.gridTopMidLeft[0] &&
    list5.value[0]?.name === expectedValues.gridTopMidLeft[3] &&
    // handle special case for gridTopMidRight
    ((list6.value[0]?.name === 'גל' && list7.value[0]?.name === 'רן') ||
      (list6.value[0]?.name === 'רן' && list7.value[0]?.name === 'גל')) &&
    list8.value[0]?.name === expectedValues.gridTopRight[0] &&
    list9.value[0]?.name === expectedValues.gridTopRight[3] &&
    list10.value[0]?.name === expectedValues.gridMidLeft[1] &&
    list11.value[0]?.name === expectedValues.gridBottomLeft[0] &&
    list12.value[0]?.name === expectedValues.gridBottomLeft[2]
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

function getInitialStateArray(key: keyof typeof initialState): GridRoom[] {
  return initialState[key].map((name) => {
    const gridItem: GridRoom = {
      id: nanoid(),
      innerValue: name,
      readonly: true,
    }
    if (name.includes('list')) {
      const typesafeName = name as keyof typeof nameLists
      return { ...gridItem, readonly: false, list: nameLists[typesafeName] }
    }
    return gridItem
  })
}

function developerFunctionFillAllExpectedValues() {}

function onAdd(e: SortableEvent) {
  if (e.to.children.length > 1) {
    const destinationList = e.to.dataset.listId as keyof typeof nameLists
    const sourceList = e.from.dataset.listId as keyof typeof nameLists | 'list1'
    const element = nameLists[destinationList].value[e.newIndex ?? 0]
    nameLists[destinationList].value.splice(e.newIndex ?? 0, 1)
    if (sourceList === 'list1') {
      list1.value.push(element)
      return
    }
    nameLists[sourceList].value.push(element)
  }
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
        <div v-for="slot in gridTopLeft" :key="slot.id">
          <input
            type="text"
            class="grid-slot"
            :value="slot.innerValue"
            readonly
            v-if="slot.readonly"
          />
          <draggable
            v-else
            class="grid-slot-draggable"
            :list="slot.list"
            group="people"
            :data-list-id="slot.innerValue"
            itemKey="name"
            @add="onAdd"
          >
            <template #item="{ element }">
              <div class="list-group-item">{{ element.name }}</div>
            </template>
          </draggable>
        </div>
      </div>
      <div class="grid">
        <div class="window-wrapper">
          <CustomIconSvg src="window" />
          <CustomIconSvg src="window" />
        </div>
        <div v-for="slot in gridTopMidLeft" :key="slot.id">
          <input
            type="text"
            class="grid-slot"
            :value="slot.innerValue"
            readonly
            v-if="slot.readonly"
          />
          <draggable
            v-else
            class="grid-slot-draggable"
            :list="slot.list"
            :data-list-id="slot.innerValue"
            group="people"
            itemKey="name"
            @add="onAdd"
          >
            <template #item="{ element }">
              <div class="list-group-item">{{ element.name }}</div>
            </template>
          </draggable>
        </div>
      </div>
      <div class="grid">
        <div class="window-wrapper">
          <CustomIconSvg src="window" />
          <CustomIconSvg src="window" />
        </div>

        <div v-for="slot in gridTopMidRight" :key="slot.id">
          <input
            type="text"
            class="grid-slot"
            :value="slot.innerValue"
            readonly
            v-if="slot.readonly"
          />
          <draggable
            v-else
            class="grid-slot-draggable"
            :list="slot.list"
            :data-list-id="slot.innerValue"
            group="people"
            itemKey="name"
            @add="onAdd"
          >
            <template #item="{ element }">
              <div class="list-group-item">{{ element.name }}</div>
            </template>
          </draggable>
        </div>
      </div>
      <div class="grid">
        <div class="window-wrapper">
          <CustomIconSvg src="window" />
          <CustomIconSvg src="window" />
        </div>
        <div v-for="slot in gridTopRight" :key="slot.id">
          <input
            type="text"
            class="grid-slot"
            :value="slot.innerValue"
            readonly
            v-if="slot.readonly"
          />
          <draggable
            v-else
            class="grid-slot-draggable"
            :list="slot.list"
            :data-list-id="slot.innerValue"
            group="people"
            itemKey="name"
            @add="onAdd"
          >
            <template #item="{ element }">
              <div class="list-group-item">{{ element.name }}</div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="row-left">
        <div class="grid">
          <div class="window-wrapper">
            <CustomIconSvg src="window" />
            <CustomIconSvg src="window" />
          </div>
          <div v-for="slot in gridMidLeft" :key="slot.id">
            <input
              type="text"
              class="grid-slot"
              :value="slot.innerValue"
              readonly
              v-if="slot.readonly"
            />
            <draggable
              v-else
              class="grid-slot-draggable"
              :list="slot.list"
              :data-list-id="slot.innerValue"
              group="people"
              itemKey="name"
              @add="onAdd"
            >
              <template #item="{ element }">
                <div class="list-group-item">{{ element.name }}</div>
              </template>
            </draggable>
          </div>
        </div>
        <div class="grid" style="padding: 40px 20px 20px 80px">
          <div class="window-wrapper">
            <CustomIconSvg src="window" />
            <CustomIconSvg src="window" />
          </div>
          <div class="coffee-wrapper">
            <CustomIconSvg src="coffee-machine" />
          </div>
          <div v-for="slot in gridBottomLeft" :key="slot.id">
            <input
              type="text"
              class="grid-slot"
              :value="slot.innerValue"
              readonly
              v-if="slot.readonly"
            />
            <draggable
              v-else
              class="grid-slot-draggable"
              :list="slot.list"
              :data-list-id="slot.innerValue"
              group="people"
              itemKey="name"
              @add="onAdd"
            >
              <template #item="{ element }">
                <div class="list-group-item">{{ element.name }}</div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
      <div class="row-right">
        <div class="name-bank">
          <h3>שמות</h3>
          <draggable
            class="list-group"
            :list="list1"
            data-list-id="list1"
            group="people"
            itemKey="name"
          >
            <template #item="{ element }">
              <div class="list-group-item">{{ element.name }}</div>
            </template>
          </draggable>
        </div>
        <div class="text">
          <p>רמזים:</p>
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
.grid-slot,
.grid-slot-draggable {
  width: 100px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  user-select: none;
  font-size: medium;
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

.text {
  direction: rtl;
  text-wrap: balance;
}
.text p {
  margin-bottom: 1rem;
}

.list-group {
  user-select: none;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 10px;
  min-width: 80px;
  min-height: 40px;
  background: white;
  /* direction: rtl; */
}
.list-group-item {
  direction: rtl;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: move;
}

.name-bank h3{
  direction: rtl;
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
