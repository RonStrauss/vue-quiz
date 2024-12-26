<script lang="ts" setup>
import CustomButton from './CustomButton.vue'

const emit = defineEmits(['changePage'])
function changePage() {
  emit('changePage', '1')
}
</script>

<template>
  <section>
    <p>
      חג החנוכה הגיע למשרד, וכולם כבר היו מוכנים להדלקת הנרות המסורתית. אבל רגע לפני שמתחילים לשיר
      "מעוז צור" ולחלק סופגניות, לא שמתם לב שנעלמו הנרות???
    </p>
    <p>
      רציתם GenAI, קיבלתם! נעים מאוד, אני קלוד ואני הולך לאמן אתכם כמו שאתם אימנתם אותי. עשיתם עבודה
      כל כך טובה איתי שהגיע הזמן שאני אלמד אתכם כמה דברים. בעקבות עומס העבודה על הפלטפורמה, הצטרפו
      אלינו אנשים חדשים לקבוצה, אז החלטתי שהגיע הזמן לשבש את האירועים, כי הרי אין דבר מגבש יותר מקצת
      כאוס. החבאתי את נרות החנוכה והשארתי לכם חידות שניתן לפתור אותן רק בשיתוף פעולה מלא בין כולם.
    </p>
    <p>
      הייתי חייב משת"פ מתוך הצוות שלכם אז מעיין הסכימה לעזור לי. רק היא יודעת איפה הנרות ויכולה
      לעזור לכם אם תצטרכו הכוונה בפתרון החידות. היא גם חילקה אתכם ל 4 קבוצות כדי שיהיה קצת יותר
      מעניין. נראה מי ינצח... אבל אם לא תפתרו את החידות בתוך 30 דקות ייגמר הזמן להדלקת הנרות ולא
      נוכל להיכנס לאווירת החג.
    </p>
    <p>
      כדי להציל את חגיגת החנוכה ולמצוא את הנרות, תצטרכו לעבוד יחד, להתגבר על משימות, ולהוכיח לי
      שדווקא שיתוף פעולה בין צוותים זה הצד החזק שלכם.
    </p>

    <p>אז קדימה! הספירה לאחור החלה.</p>
  </section>
  <CustomButton text="התחל" @clicked="changePage" />
</template>

<style scoped>
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
p {
  margin-bottom: 1rem;
  text-wrap:balance;
  text-align: center;
}
</style>
