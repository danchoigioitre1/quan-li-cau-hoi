<template>
  <div class="true-false-question-modal">
    <div class="question">
      <div class="order-question">
        <span>Câu hỏi - Điền ô trống</span>
      </div>
      <VTextEditor />
      <!--khu vuc cau trả lời-->
      <div class="answer-fill-blank-container">
        <div
          v-for="(item, index) in answerList"
          :key="item.id"
          class="answer-fill-blank"
        >
          <label>Ô trống {{ index + 1 }}</label>
          <div style="display: flex">
            <div class="answer-list">
              <div
                v-for="answer in item.answer"
                :key="answer"
                class="answer-detail"
              >
                {{ answer }}
                <button @click="deleteAnswerInList(item, answer)">
                  <img
                    src="https://sisapapp.misacdn.net/lms/img/ic_remove.2d9e09d5.svg"
                    alt=""
                  />
                </button>
              </div>
              <input
                type="text"
                v-model="answerCurrentList[index]"
                class="input--fill-blank"
                :placeholder="
                  item.answer.length == 0 ? 'Nhập đáp án rồi nhấn enter' : ''
                "
                @keyup.enter="submit(item.answer, index)"
              />
            </div>

            <div class="div--delete-answer">
              <button
                class="button--delete-answer"
                @click="deleteAnswer(item.id)"
              >
                <img
                  src="https://sisapapp.misacdn.net/lms/img/ic_remove.2d9e09d5.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
        <button @click="addAnswer" class="button--add-answer">
          <i class="bx bx-plus"></i> Thêm đáp án
        </button>
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
  <!--Show cảnh báo khi xoa câu trả lời-->
  <VToastWarning v-if="showWarnToast" text="Câu hỏi phải có ít nhất 1 đáp án" />
  <VAlertModal v-if="isShowAlert" :text="textAlert" />
</template>

<script>
import VTextEditor from "../../components/VTextEditor.vue";
import VToastWarning from "../../components/VToastWarn.vue";
import VAlertModal from "@/components/VAlertModal.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import { BASE_URL, CREATE_MULTIPLE_ANSWER } from "@/js/service/api";
export default {
  name: "TrueFalseQuestionModal",
  components: { VTextEditor, VToastWarning, VAlertModal },
  created() {
    if (this.questionMode == 2) {
      console.log(this.questionSelected);
      this.questionContent = this.questionSelected.questionContent;
      this.answerList = this.questionSelected.answerList.map((item) => {
        return {
          id: item.id,
          isTrue: 1,
          answer: item.value.split(","),
        };
      });
    }

    this.$emitter.on("closeWarnToast", () => {
      this.showWarnToast = false;
    });

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
    this.$emitter.off("closeAlertModal");
    this.$emitter.off("contentText");
  },
  computed: {
    ...mapGetters(["questionSelected", "questionMode", "exerciseSelectedId"]),
  },
  data() {
    return {
      isShowAlert: false,
      textAlert: "",

      questionContent: "",
      answerList: [{ id: Math.random() * 99, answer: [] }],
      answerCurrentList: [],
      showWarnToast: false,
    };
  },
  methods: {
    ...mapActions(["setQuestionMode", "updateQuestionById", "deleteAnswers"]),
    addQuestion() {
      this.checkQuestion();
      if (this.textAlert == "") {
        var answers = this.answerList.map((item) => {
          return {
            id: item.id,
            isTrue: 1,
            value: item.answer.join(", "),
          };
        });
        var question = {
          questionId: Math.random() * 100,
          questionContent: this.questionContent.replace(
            "<p>Nhập câu hỏi tại đây:</p>",
            ""
          ),
          answerList: answers,
          questionType: 3,
          questionNote: "",
        };
        if (this.questionMode == 1) {
          this.$emitter.emit("addFillBlankQuestion", question);
        } else {
          var questionUpdate = {
            questionId: this.questionSelected.questionId,
            questionContent: question.questionContent,
            typeQuestion: question.questionType,
            exerciseId: this.exerciseSelectedId,
            questionNote: "",
          };

          var answerListId = this.questionSelected.answerList.map(
            (item) => item.id
          );
          console.log(answerListId);

          var answerList = this.answerList.map((item) => {
            return {
              id: item.id,
              isTrue: 1,
              value: item.answer.join(", "),
            };
          });

          this.updateQuestionById(questionUpdate);
          this.deleteAnswers(answerListId);
          this.createNewAnswer(this.questionSelected.questionId, answerList);
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
      this.textAlert = "";
      var list = this.answerList.map((item) => item.answer);
      if (this.questionContent == "") {
        this.textAlert = "Bạn vui lòng nhập nội dung câu hỏi";
      } else if (list.some((item) => item.length == 0)) {
        this.textAlert = "Bạn vui lòng nhập nội dung đáp án";
      }
    },
    closeModalQuestion() {
      this.$emitter.emit("closeModalQuestion");
    },
    deleteAnswerInList(item, answer) {
      item.answer = item.answer.filter((detail) => detail != answer);
    },
    submit(list, index) {
      list.push(this.answerCurrentList[index]);
      this.answerCurrentList[index] = "";
    },

    deleteAnswer(id) {
      if (this.answerList.length != 1) {
        this.answerList = this.answerList.filter((item) => item.id != id);
      } else {
        this.showWarnToast = true;
        setTimeout(() => {
          this.showWarnToast = false;
        }, 5000);
      }
    },
    addAnswer() {
      this.answerList.push({ id: Math.random() * 99, answer: [] });
    },
  },
};
</script>
<style>
@import url("../../css/main.css");
</style>
