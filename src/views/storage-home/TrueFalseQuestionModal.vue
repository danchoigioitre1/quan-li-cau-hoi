<template>
  <div class="true-false-question-modal">
    <div class="question">
      <div class="order-question">
        <span>Câu hỏi - Đúng sai</span>
      </div>
      <VTextEditor />
      <div class="container--answer-true-false">
        <div class="answer answer-true">
          <label
            :style="
              correctAnswer == 1 ? 'background-color:#00c542;color:white' : ''
            "
            @click="chooseCorrectAnswer(1)"
            ><i class="bx bx-check tf-check"></i
          ></label>
          <div class="answer-tooltip">{{ this.$ExerciseList.MarkAnswer }}</div>
          <span
            ><input
              type="text"
              class="true-false-answer"
              v-model="answerList[0].value"
          /></span>
        </div>
        <div class="answer answer-false">
          <label
            :style="
              correctAnswer == 2 ? 'background-color:#00c542;color:white' : ''
            "
            @click="chooseCorrectAnswer(2)"
            ><i class="bx bx-check tf-check"></i
          ></label>
          <div class="answer-tooltip">{{ this.$ExerciseList.MarkAnswer }}</div>
          <span>
            <input
              type="text"
              class="true-false-answer"
              v-model="answerList[1].value"
          /></span>
        </div>
      </div>
    </div>
    <div class="button-group">
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

  <!--thong bao khi sai/thieu dap an-->
  <VAlertModal v-if="isShowAlert" :text="alertText" />
</template>

<script>
import VTextEditor from "../../components/VTextEditor.vue";
import VAlertModal from "@/components/VAlertModal.vue";
import axios from "axios";
import { BASE_URL, CREATE_MULTIPLE_ANSWER } from "@/js/service/api";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TrueFalseQuestionModal",
  components: { VTextEditor, VAlertModal },
  created() {
    console.log(this.questionSelected);
    if (this.questionMode == 2) {
      this.questionContent = this.questionSelected.questionContent;
      this.answerList = this.questionSelected.answerList;
      this.correctAnswer =
        this.answerList.findIndex((item) => item.isTrue == 1) + 1;
    }

    this.$emitter.on("closeAlertModal", () => {
      this.isShowAlert = false;
    });

    this.$emitter.on(
      "contentText",
      (content) => (this.questionContent = content)
    );
  },
  beforeUnmount() {
    this.setQuestionMode(1);
    this.$emitter.off("closeWarnToast");
    this.$emitter.off("contentText");
  },
  computed: {
    ...mapGetters(["questionSelected", "questionMode", "exerciseSelectedId"]),
  },
  data() {
    return {
      isShowAlert: false,
      alertText: "",

      questionContent: "",
      answerList: [
        {
          value: "Đúng",
          id: 1,
        },
        {
          value: "Sai",
          id: 2,
        },
      ],
      correctAnswer: null,
    };
  },
  methods: {
    ...mapActions(["setQuestionMode", "updateQuestionById", "deleteAnswers"]),
    addQuestion() {
      this.checkQuestion();
      if (this.alertText == "") {
        var answers = this.answerList.map((item) => {
          return {
            ...item,
            isTrue: this.correctAnswer == item.id ? 1 : 2,
          };
        });
        var question = {
          questionId: Math.random() * 100,
          questionContent: this.questionContent.replace(
            "<p>Nhập câu hỏi tại đây:</p>",
            ""
          ),
          answerList: answers,
          questionType: 2,
          questionNote: "",
        };
        if (this.questionMode == 1) {
          this.$emitter.emit("addTrueFalseQuestion", question);
        } else {
          var questionUpdate = {
            questionId: this.questionSelected.questionId,
            questionContent: question.questionContent,
            typeQuestion: question.questionType,
            exerciseId: this.exerciseSelectedId,
            questionNote: "",
          };
          var idList = this.questionSelected.answerList.map((item) => item.id);

          this.updateQuestionById(questionUpdate);
          this.deleteAnswers(idList);
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
    checkQuestion() {
      this.alertText = "";
      var listAnswer = this.answerList.map((item) => item.value);

      if (this.questionContent == "") {
        this.alertText = "Bạn vui lòng nhập nội dung câu hỏi";
      } else if (this.correctAnswer == null) {
        this.alertText = "Bạn vui lòng chọn đáp án đúng";
      } else if (listAnswer.includes("")) {
        this.alertText = "Bạn vui lòng chọn không để trống câu trả lời";
      }
    },

    closeModalQuestion() {
      this.$emitter.emit("closeModalQuestion");
    },
    chooseCorrectAnswer(id) {
      this.correctAnswer = id;
      if (this.questionMode == 2) {
        if (id == 1) {
          this.answerList[0].isTrue = 1;
          this.answerList[1].isTrue = 2;
        } else {
          this.answerList[0].isTrue = 2;
          this.answerList[1].isTrue = 1;
        }
      }
    },
  },
};
</script>
<style>
@import url("../../css/main.css");
.true-false-answer {
  width: 90%;
  outline: none;
  text-align: center;
  color: #4e5b6a;
  margin-left: 7px;
}
</style>
