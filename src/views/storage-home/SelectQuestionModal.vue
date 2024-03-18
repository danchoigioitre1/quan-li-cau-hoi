<template>
  <div class="true-false-question-modal">
    <div class="question">
      <div class="order-question">
        <span>Câu hỏi - Chọn đáp án</span>
      </div>
      <VTextEditor />
      <div class="select-answer-container">
        <SelectAnswer
          v-for="(answer, index) in answerList"
          :key="answer.id"
          :bgc="colorAnswerList[(index + 1) % colorAnswerList.length]"
          :alphabet="alphabetList[index]"
          :id="answer.id"
          :content="answer.value"
          :status="answer.isTrue"
        />
      </div>
    </div>
    <div class="button-group">
      <button class="button--question add-answer--button" @click="addAnswer">
        Thêm đáp án
      </button>
      <button
        class="button--question cancel-button"
        @click="closeModalQuestion"
      >
        Hủy
      </button>
      <button @click="addQuestion" class="button--question save-close-button">
        Lưu và đóng
      </button>
      <button class="button--question save-add-button">
        Lưu và thêm câu hỏi
      </button>
    </div>
  </div>
  <!--Show modal khi sai/thieu thong tin-->
  <VAlertModal v-if="isShowAlert" :text="textAlert" />
  <VToastWarning v-if="showWarnToast" text="Câu hỏi phải có ít nhất 1 đáp án" />
</template>

<script>
import VTextEditor from "../../components/VTextEditor.vue";
import SelectAnswer from "./SelectAnswer.vue";
import VAlertModal from "@/components/VAlertModal.vue";
import VToastWarning from "../../components/VToastWarn.vue";
import axios from "axios";
import { BASE_URL, CREATE_MULTIPLE_ANSWER } from "@/js/service/api";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SelectQuestionModal",
  components: {
    VTextEditor,
    SelectAnswer,
    VAlertModal,
    VToastWarning,
  },
  created() {
    if (this.questionMode == 2) {
      console.log(this.questionSelected);
      this.answerList = this.questionSelected.answerList;
      this.questionContent = this.questionSelected.questionContent;
    }

    this.$emitter.on("closeWarnToast", () => {
      this.showWarnToast = false;
    });

    this.$emitter.on("closeAlertModal", () => {
      this.isShowAlert = false;
    });

    this.$emitter.on("changeAnswer", (answer, id) => {
      var answerIndex = this.answerList.findIndex((item) => item.id == id);
      this.answerList[answerIndex].value = answer;
    });

    this.$emitter.on("deleteSelectAnswer", (id) => {
      if (this.answerList.length != 1) {
        this.answerList = this.answerList.filter((item) => item.id != id);
      } else {
        this.showWarnToast = true;
        setTimeout(() => {
          this.showWarnToast = false;
        }, 5000);
      }
    });

    this.$emitter.on("selectCorrectAnswer", (id, isTrueAnswer) => {
      var answerIndex = this.answerList.findIndex((item) => item.id == id);
      this.answerList[answerIndex].isTrue = isTrueAnswer;
    });

    this.$emitter.on(
      "contentText",
      (content) => (this.questionContent = content)
    );
  },
  beforeUnmount() {
    this.setQuestionMode(1);
    this.$emitter.off("closeWarnToast");
    this.$emitter.off("closeAlertModal");
    this.$emitter.off("changeAnswer");
    this.$emitter.off("deleteSelectAnswer");
    this.$emitter.off("selectCorrectAnswer");
    this.$emitter.off("contentText");
  },
  data() {
    return {
      textAlert: "",
      isShowAlert: false,
      showWarnToast: false,
      questionContent: "",
      answerList: [
        { id: Math.random() * 10, value: "", isTrue: 2 },
        { id: Math.random() * 10, value: "", isTrue: 2 },
        { id: Math.random() * 10, value: "", isTrue: 2 },
        { id: Math.random() * 10, value: "", isTrue: 2 },
      ],

      colorAnswerList: ["#c4e5ff", "#ffd6f0", "#acebf1", "#fcd0c6"],
      alphabetList:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_=+[]{}|;:,.<>/?[][][][][][][][][][][][][][][][][][][][][]",
    };
  },
  methods: {
    ...mapActions(["setQuestionMode", "updateQuestionById", "deleteAnswers"]),
    addQuestion() {
      this.checkQuestion();
      if (this.textAlert == "") {
        var question = {
          questionId:
            this.questionMode == 1
              ? Math.random() * 1000
              : this.questionSelected.questionId,
          questionContent:
            this.questionMode == 1
              ? this.questionContent.replace("<p>Nhập câu hỏi tại đây:</p>", "")
              : this.questionContent,
          answerList: this.answerList,
          questionType: 1,
          questionNote: "",
        };
        if (this.questionMode == 1) {
          this.$emitter.emit("addSelectQuestion", question);
        } else {
          var questionUpdate = {
            questionId: this.questionSelected.questionId,
            questionContent: question.questionContent,
            typeQuestion: question.questionType,
            exerciseId: this.exerciseSelectedId,
            questionNote: "",
          };

          var answerListId = this.questionSelected.answerList
            .map((item) => {
              if (typeof item.id == "string") {
                return item.id;
              }
            })
            .filter((item) => item != null);
          this.updateQuestionById(questionUpdate);
          this.deleteAnswers(answerListId);
          this.createNewAnswer(
            this.questionSelected.questionId,
            this.answerList
          );
        }

        this.closeModalQuestion();
      } else {
        this.isShowAlert = true;
      }
    },

    checkQuestion() {
      this.textAlert = "";
      var listAnswer = this.answerList.map((item) => item.value);
      var listRightWrong = this.answerList.map((item) => item.isTrue);

      if (this.questionContent == "") {
        this.textAlert = "Bạn vui lòng nhập nội dung câu hỏi";
      } else if (listAnswer.every((item) => item == "")) {
        this.textAlert = "Bạn vui lòng nhập nội dung đáp án, chọn đáp án đúng.";
      } else if (!listRightWrong.includes(1)) {
        this.textAlert = "Bạn vui lòng nhập nội dung đáp án, chọn đáp án đúng.";
      }
      for (let i = 0; i < this.answerList.length; i++) {
        if (listRightWrong[i] == 1 && listAnswer[i] == "") {
          this.textAlert =
            "Bạn vui lòng nhập nội dung đáp án, chọn đáp án đúng.";
        }
      }
    },

    closeModalQuestion() {
      this.$emitter.emit("closeModalQuestion");
    },

    addAnswer() {
      this.answerList.push({
        id: Math.random() * 10,
        value: "",
      });
    },

    createNewAnswer(id, answer) {
      var answerList = answer.map((item) => {
        return {
          answerContent: item.value,
          answerImage: "",
          answerStatus: item.isTrue,
          questionId: id,
        };
      });
      axios.post(`${BASE_URL}/${CREATE_MULTIPLE_ANSWER}`, answerList);
    },
  },
  computed: {
    ...mapGetters(["questionSelected", "questionMode", "exerciseSelectedId"]),
  },
};
</script>
<style>
@import url("../../css/main.css");
</style>
