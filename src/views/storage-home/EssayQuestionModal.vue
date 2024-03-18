<template>
  <div class="true-false-question-modal">
    <div class="question test">
      <div class="order-question">
        <span>Câu hỏi - Tự luận</span>
      </div>
      <VTextEditor />
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

  <!--sho alert khi thieu noi dung cau hoi-->
  <VAlertModal v-if="isShowAlert" :text="textAlert" />
</template>

<script>
import VTextEditor from "../../components/VTextEditor.vue";
import VAlertModal from "@/components/VAlertModal.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EssayQuestionModal",
  components: { VTextEditor, VAlertModal },
  created() {
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
    this.$emitter.off("closeAlertModal");
    this.$emitter.off("contentText");
    this.$emitter.off("editQuestion");
  },
  data() {
    return {
      textAlert: "",
      isShowAlert: false,
      questionContent: "",
    };
  },
  computed: {
    ...mapGetters(["questionSelected", "questionMode", "exerciseSelectedId"]),
  },
  methods: {
    ...mapActions(["setQuestionMode", "updateQuestionById"]),
    addQuestion() {
      this.checkQuestion();
      if (this.textAlert == "") {
        var question = {
          questionId: Math.random() * 100,
          questionContent: this.questionContent.replace(
            "<p>Nhập câu hỏi tại đây:</p>",
            ""
          ),
          answerList: [{ value: "noteForQuestion", isTrue: 1 }],
          questionType: 4,
          questionNote: "",
        };
        if (this.questionMode == 1) {
          this.$emitter.emit("addEssayQuestion", question);
        } else {
          var questionUpdate = {
            questionId: this.questionSelected.questionId,
            questionContent: question.questionContent,
            typeQuestion: question.questionType,
            exerciseId: this.exerciseSelectedId,
            questionNote: "",
          };
          this.updateQuestionById(questionUpdate);
        }

        this.closeModalQuestion();
      } else {
        this.isShowAlert = true;
      }
    },
    closeModalQuestion() {
      this.$emitter.emit("closeModalQuestion");
    },
    checkQuestion() {
      this.textAlert = "";

      if (this.questionContent == "") {
        this.textAlert = "Bạn vui lòng nhập nội dung câu hỏi";
      }
    },
  },
};
</script>
<style scoped>
@import url("../../css/main.css");
.test {
  background-color: #fff2ab;
}
</style>
