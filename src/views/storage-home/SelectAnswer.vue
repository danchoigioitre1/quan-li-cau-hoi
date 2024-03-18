<template>
  <div
    class="answer-item-container"
    @click="changeStatus(1)"
    v-click-outside="changeStatusOut"
    :style="{ 'background-color': bgc }"
  >
    <div class="title-answer">
      <div class="alphabet">{{ alphabet }}</div>
      <div class="button-group--answer">
        <button @click.stop="deleteSelectAnswer" class="deleteSelectAnswer">
          <img
            src="https://sisapapp.misacdn.net/lms/img/icon_delete.9097d258.svg"
            alt=""
          />
        </button>
        <button>
          <img
            src="https://sisapapp.misacdn.net/lms/img/ck_file.301a99b1.svg"
            alt=""
          />
        </button>
        <button
          class="select-answer-button"
          @click.stop="selectCorrectAnswer"
          :style="
            isTrueAnswer == 1 ? 'background-color:#00c542;color:white' : ''
          "
        >
          <i class="bx bx-check tf-check"></i>
        </button>
      </div>
    </div>
    <div class="text-area-answer">
      <textarea
        ref="inputAnswer"
        v-if="stateCurrent == stateFillAnswer.fill"
        type="text"
        class="input--answer"
        v-model="answerText"
        @input="changeAnswer"
      ></textarea>

      <div class="show-answer" v-if="stateCurrent == stateFillAnswer.show">
        <span v-if="answerText == ''" class="required-fill"
          >Nhập đáp án ...</span
        >
        <span class="select-answer" v-else> {{ answerText }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SelectAnswer",
  props: ["bgc", "alphabet", "id", "content", "status"],
  created() {
    this.answerText = this.content;
    this.isTrueAnswer = this.status;
  },
  data() {
    return {
      stateFillAnswer: {
        fill: 1,
        show: 2,
      },
      stateCurrent: 2,

      answerText: "",
      isTrueAnswer: 2, // 1 - đúng, 2 - sai
    };
  },
  methods: {
    changeStatus(status) {
      this.stateCurrent = status;
      if (this.stateCurrent == 1) {
        this.$nextTick(() => {
          this.$refs.inputAnswer.focus();
        });
      }
    },
    changeStatusOut() {
      this.stateCurrent = 2;
    },
    changeAnswer() {
      this.$emitter.emit("changeAnswer", this.answerText, this.id);
    },
    deleteSelectAnswer() {
      this.$emitter.emit("deleteSelectAnswer", this.id);
    },
    selectCorrectAnswer() {
      this.isTrueAnswer = this.isTrueAnswer == 2 ? 1 : 2;
      this.$emitter.emit("selectCorrectAnswer", this.id, this.isTrueAnswer);
    },
  },
};
</script>
<style></style>
