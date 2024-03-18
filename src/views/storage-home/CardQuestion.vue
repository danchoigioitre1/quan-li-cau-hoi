<template>
  <div class="question-card__container">
    <div class="question-card_decore" :style="{ backgroundColor: color }"></div>
    <div class="question-detail">
      <div class="question-content">
        <span class="order-question--card">{{ order }}.</span>
        <div class="question-div" ref="questionContent"></div>
      </div>

      <div class="answer-content" v-if="question.questionType != 4">
        <div
          class="answer--card"
          v-for="(answer, index) in question.answerList"
          :key="answer.id"
        >
          <div
            :style="{
              backgroundColor: answer.isTrue == 1 ? '#00c542' : '#b6b9ce',
            }"
          >
            {{ alphabetList[index] }}
          </div>
          <span :id="alphabetList[index]">{{ answer.value }}</span>
        </div>
      </div>
      <div v-else class="essay-div"></div>
    </div>

    <div class="hr-line" v-if="question.questionNote != ''"></div>

    <div class="question-hint-div" v-if="question.questionNote != ''">
      <span class="order-question--card">Lời giải : </span>
      <span class="question--note" ref="note"></span>
    </div>

    <div class="hr-line"></div>

    <div class="question__toolbar">
      <button @click="editQuestion" class="question__toolbar--button">
        Chỉnh sửa
      </button>
      <button class="question__toolbar--button">
        <img
          src="https://sisapapp.misacdn.net/lms/img/ic_dublicate.1b09bc72.svg"
          alt=""
        />
      </button>
      <button @click="deleteQuestion" class="question__toolbar--button">
        <img
          src="https://sisapapp.misacdn.net/lms/img/icon_delete.9097d258.svg"
          alt=""
        />
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "CardQuestion",
  data() {
    return {
      color: "",
      colorDecoreList: ["#ffd200", "#00a9ec", "#ff588c", "#fe9882"],
      alphabetList:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_=+[]{}|;:,.<>/?[][][][][][][][][][][][][][][][][][][][][]",
    };
  },
  props: ["question", "order"],
  created() {
    this.selectColorDecore();

    this.$nextTick(() => {
      this.$refs.questionContent.innerHTML = this.question.questionContent;
    });

    if (this.question.questionNote != "") {
      this.$nextTick(() => {
        this.$refs.note.innerHTML = this.question.questionNote;
      });
    }
  },

  methods: {
    ...mapActions(["setQuestionSelected", "setQuestionMode"]),

    editQuestion() {
      this.$emitter.emit("edit", this.question);
      this.setQuestionSelected(this.question);
      this.setQuestionMode(2);
    },

    selectColorDecore() {
      this.color = this.colorDecoreList[this.question.questionType % 4];
    },

    deleteQuestion() {
      this.$emitter.emit("deleteQuestion", this.question.questionId);
    },
  },
};
</script>
<style scoped>
.question-card__container {
  margin: 25px 17px;
  box-shadow: 0 3px 20px rgba(90, 125, 141, 0.16);
  border-radius: 0 0 6px 6px;
  width: 1186px;
  box-sizing: border-box;
  overflow: hidden;
}
.question-card_decore {
  width: 100%;
  height: 8px;
  border-radius: 6px 6px 0 0;
}
.question-detail {
  padding: 20px;
}
.hr-line {
  width: calc(100% - 40px);
  margin: auto;
  border-bottom: 1px solid #eaebf5;
}
.question-content {
  display: flex;
  column-gap: 4px;
}
.order-question--card {
  font-size: 16px;
  color: #4e5b6a;
  font-weight: bold;
}
.answer-content {
  display: flex;
  margin-top: 20px;
  column-gap: 230px;
  row-gap: 20px;
  flex-wrap: wrap;
}
.answer--card {
  display: flex;
}
.answer--card div {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  text-align: center;
  margin-right: 4px;
}
.question-hint-div {
  padding: 20px;
}
.question__toolbar--button {
  height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #f1f2f7;
  border: 1px solid #b6b9ce;
  border-radius: 8px;
  font-size: 14px;
  margin-right: 15px;
  display: flex;
  align-items: center;
}
.question__toolbar--button:active {
  transform: translateY(4px);
  box-shadow: inset 0px 3px 5px 3px rgba(0, 0, 0, 0.188);
}
.question__toolbar {
  padding: 20px;
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
