<script lang="ts" setup>
import type { Icons } from '@/types/Icons'
import CustomIconSvg from './CustomIconSvg.vue'
import { ref, watch } from 'vue'

const emit = defineEmits(['changePage'])
function changePage() {
  emit('changePage', '4')
}

const expectedColor = '#FD5C4E'
const selectedColor = ref('')
const selectedAnswers = ref(Array(questions.length).fill(null))
watch(selectedColor, (newVal) => {
  if (newVal.toLowerCase() === expectedColor.toLowerCase()) {
    changePage()
  }
})
</script>

<template>
  <div class="flex">
    <div class="flex-right">
      <div class="question" v-for="(question, index) in questions" :key="index">
        <p>{{ question.q }}</p>
        <div class="buttons">
          <label>
            <input
              type="radio"
              :name="'question' + index"
              value="true"
              v-model="selectedAnswers[index]"
            />
            נכון
          </label>
          <label>
            <input
              type="radio"
              :name="'question' + index"
              value="false"
              v-model="selectedAnswers[index]"
            />
            לא נכון
          </label>
          <CustomIconSvg
            v-if="selectedAnswers[index] !== null"
            :src="selectedAnswers[index] === 'true' ? question.t : question.f"
          />
        </div>
      </div>
    </div>

    <div class="flex-left">
      <h2>מקרא</h2>
      <div class="legend">
        <div v-for="icon in legendIcons" :key="icon.code" class="legend-item">
          <span>{{ icon.code }}</span>
          <CustomIconSvg :src="icon.icon" />
        </div>
      </div>
    </div>
  </div>
  <div class="answer">
    <input type="color" v-model="selectedColor" />
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.flex-right {
  display: grid;
  gap: 1rem;
}
.answer input {
  width: 150px;
  height: 75px;
}
.flex-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.question .buttons {
  display: flex;
  gap: 1rem;
  min-height: 50px;
}
.left {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.right {
  display: flex;
  gap: 0.5rem;
}
label {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
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

.legend {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  direction: ltr;
}
.legend-item {
  display: flex;
  flex-direction: column;
  font-size: large;
}

.legend-item span {
  font-weight: 500;
  text-decoration: underline;
}
</style>

<script lang="ts">
const legendIcons: Array<{ code: string; icon: Icons }> = [
  {
    code: '0',
    icon: 'flag',
  },
  {
    code: '1',
    icon: 'hashtag',
  },
  {
    code: '2',
    icon: 'hourglass',
  },
  {
    code: '3',
    icon: 'hurricane-alt',
  },
  {
    code: '4',
    icon: 'lock-alt',
  },
  {
    code: '5',
    icon: 'overline',
  },
  {
    code: '6',
    icon: 'sigma',
  },
  {
    code: '7',
    icon: 'snow',
  },
  {
    code: '8',
    icon: 'star-alt-1',
  },
  {
    code: '9',
    icon: 'temperature-full',
  },
  {
    code: 'A',
    icon: 'bold',
  },
  {
    code: 'B',
    icon: 'circle-quarters',
  },
  {
    code: 'C',
    icon: 'clock-eight',
  },
  {
    code: 'D',
    icon: 'cruzeiro-sign',
  },
  {
    code: 'E',
    icon: 'cube-alt-2',
  },
  {
    code: 'F',
    icon: 'filter',
  },
]
const questions: Array<{ q: string; t: Icons; f: Icons }> = [
  { q: 'הלקוח הכי גדול של BMC Helix רכש 620k execitions', t: 'temperature-full', f: 'filter' },
  {
    q: 'השנים שניר עובד ב BMC זהות לשנים שמעיין קנטור חיה',
    t: 'cruzeiro-sign',
    f: 'hurricane-alt',
  },
  { q: 'רן הוא העובד הכי חדש בקבוצה', t: 'hashtag', f: 'overline' },
  { q: 'כיום יש x פלטפורמות בכל חשבונות פרודקשן', t: 'clock-eight', f: 'cube-alt-2' },
  {
    q: 'הנר השמיני בחנוכייה נקרא "שמש" ומשתמשים בו כדי להדליק את שאר הנרות',
    t: 'sigma',
    f: 'lock-alt',
  },
  { q: 'חברת BMC פועלת במעל ל 50 מדינות בעולם ', t: 'cube-alt-2', f: 'hourglass' },
]
</script>
