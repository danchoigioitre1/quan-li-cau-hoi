<template>
  <div class="create-question-container">
    <div class="title-create-question">
      <div class="title-question">
        <button @click="backToStorageHome">
          <img
            src="https://sisapapp.misacdn.net/lms/img/icon_back.91713f1b.svg"
            alt=""
          />
        </button>
        <img
          src="https://sisapapp.misacdn.net/lms/img/toan2.099749bd.png"
          alt=""
          class="logo-create"
        />
        <input
          type="text"
          placeholder="Nhập tên bài tập..."
          class="question-name-input"
          v-model="exercise.exerciseName"
        />
      </div>
      <div class="create-div--button">
        <div class="left-div">
          <VCombobox
            :listData="subjectList"
            placeholder="Tất cả các môn"
            field="subjectId"
          />
          <VCombobox
            :listData="gradeList"
            placeholder="Tất cả khối"
            field="classId"
          />
          <button>{{ this.$ExerciseList.AddInfor }}</button>
          <button>{{ this.$ExerciseList.ChangeType }}</button>
        </div>
        <div class="right-div">
          <button class="button--help">
            <img
              src="https://sisapapp.misacdn.net/lms/img/ic_help.6d809294.svg"
              alt=""
            />
          </button>
          <button class="button--try">{{ this.$ExerciseList.Try }}</button>
          <button @click="changeStatusExercise" class="button--done">
            {{ this.$ExerciseList.Done }}
          </button>
        </div>
      </div>
    </div>

    <!--Màn hình khi chưa có câu hỏi-->
    <div v-if="questionList.length == 0" class="create--content">
      <div class="intro-create">
        <span>{{ this.$ExerciseList.AutoCreate }}</span>
      </div>
      <label class="input-import-question" for="input-question">
        <input type="file" id="input-question" class="input-question" />
        <img
          src="https://sisapapp.misacdn.net/lms/img/ic_extract.d2689d03.svg"
          alt=""
        />
        <span>Nhấp để tỉa file bài tập hoặc kéo thả file vào đây</span>
        <span>File có định dạng xls, xlsx, doc, docx, pdf, ...</span>
        <div class="import-div--button">
          <label class="label-import" for="input-question"
            >Tải lên file bài tập</label
          >
          <label class="label-download">Tải file excel mâũ</label>
        </div>
      </label>
      <span class="create-question">{{
        this.$ExerciseList.CreateQuestion
      }}</span>
      <div class="create-question--type">
        <CreateQuestionButton
          logo="https://sisapapp.misacdn.net/lms/img/library.fc851823.svg"
          detail="Thư viện học liệu"
        />
        <div class="line"></div>
        <CreateQuestionButton
          @click="CreateQuestion(typeQuestion.select)"
          logo="https://sisapapp.misacdn.net/lms/img/select.c15dfe74.svg"
          detail="Chọn đáp án"
        />
        <CreateQuestionButton
          class="fix-position"
          @click="CreateQuestion(typeQuestion.trueFalse)"
          logo="https://sisapapp.misacdn.net/lms/img/yesorno.7f4f0b5a.svg"
          detail="Đúng sai"
        />
        <CreateQuestionButton
          @click="CreateQuestion(typeQuestion.fillBlank)"
          logo="https://sisapapp.misacdn.net/lms/img/fill.af676902.svg"
          detail="Điền vào chỗ trống"
        />
        <CreateQuestionButton
          logo="https://sisapapp.misacdn.net/lms/img/pairing.4e1fb31f.svg"
          detail="Ghép nối"
        />
        <CreateQuestionButton
          logo="https://sisapapp.misacdn.net/lms/img/group.ca2a19ef.svg"
          detail="Câu hỏi nhóm"
        />
        <CreateQuestionButton
          @click="CreateQuestion(typeQuestion.essay)"
          logo="https://sisapapp.misacdn.net/lms/img/essay.e07e1e68.svg"
          detail="Tự luận"
        />
      </div>
    </div>
    <!---->
    <!--Màn hình khi có câu hỏi-->

    <div class="show-question-div" v-if="questionList.length != 0">
      <div class="question-list">
        <CardQuestion
          v-for="(question, index) in questionList"
          :key="question.questionContent"
          :question="question"
          :order="index + 1"
        />
      </div>
      <div class="question-sidebar">
        <button @click="CreateQuestion(typeQuestion.select)">
          <img
            src="https://sisapapp.misacdn.net/lms/img/select.c15dfe74.svg"
            alt=""
          />
        </button>
        <button @click="CreateQuestion(typeQuestion.trueFalse)">
          <img
            src="https://sisapapp.misacdn.net/lms/img/yesorno.7f4f0b5a.svg"
            alt=""
          />
        </button>
        <button @click="CreateQuestion(typeQuestion.fillBlank)">
          <img
            src="https://sisapapp.misacdn.net/lms/img/fill.af676902.svg"
            alt=""
          />
        </button>
        <button>
          <img
            src="https://sisapapp.misacdn.net/lms/img/pairing.4e1fb31f.svg"
            alt=""
          />
        </button>
        <button>
          <img
            src="https://sisapapp.misacdn.net/lms/img/group.ca2a19ef.svg"
            alt=""
          />
        </button>
        <button @click="CreateQuestion(typeQuestion.essay)">
          <img
            src="https://sisapapp.misacdn.net/lms/img/essay.e07e1e68.svg"
            alt=""
          />
        </button>
      </div>
    </div>

    <!---->

    <div class="create--support" v-if="isShowSupportText">
      <div class="support--text">
        <button class="close-button--help" @click="closeShowSupportText">
          <img
            src="https://sisapapp.misacdn.net/lms/img/ic_remove.2d9e09d5.svg"
            alt=""
            class="logo--close"
          />
        </button>
        <span>{{ this.$ExerciseList.TeacherShare }}</span>
        <span class="effect-text">{{
          this.$ExerciseList.SisapComunication
        }}</span>
        <span>{{ this.$ExerciseList.Supported }}</span>
      </div>
      <img
        src="https://sisapapp.misacdn.net/lms/img/recommend-wonder.57d0c1c2.svg"
        alt=""
        class="logo--cat"
      />
    </div>
    <!--Mở form các loại câu hỏi-->
    <div v-if="openTypeQuestion == typeQuestion.trueFalse">
      <TrueFalseQuestionModal />
    </div>
    <div v-else-if="openTypeQuestion == typeQuestion.fillBlank">
      <FillBlankQuestionModal />
    </div>
    <div v-else-if="openTypeQuestion == typeQuestion.essay">
      <EssayQuestionModal />
    </div>
    <div v-else-if="openTypeQuestion == typeQuestion.select">
      <SelectQuestionModal />
    </div>
    <!---->
  </div>
</template>

<script>
import CreateQuestionButton from "../../../views/storage-home/CreateQuestionButton.vue";
import VCombobox from "../../../components/VCombobox.vue";
import TrueFalseQuestionModal from "../../../views/storage-home/TrueFalseQuestionModal.vue";
import FillBlankQuestionModal from "../../../views/storage-home/FillBlankQuestionModal.vue";
import EssayQuestionModal from "@/views/storage-home/EssayQuestionModal.vue";
import SelectQuestionModal from "../../../views/storage-home/SelectQuestionModal.vue";
import CardQuestion from "@/views/storage-home/CardQuestion.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import {
  BASE_URL,
  CREATE_EXERCISE,
  CREATE_QUESTION,
  CREATE_MULTIPLE_ANSWER,
} from "@/js/service/api";
export default {
  name: "CreateQuestion",

  created() {
    if (this.exerciseSelectedId != "") {
      this.getQuestionList(this.exerciseSelectedId);
    }

    this.$emitter.on("selectItemCombobox", (item, field) => {
      this.exercise[field] = item.id;
    });

    this.$emitter.on("closeModalQuestion", () => {
      this.openTypeQuestion = -1;
    });

    this.$emitter.on("addSelectQuestion", (question) => {
      this.questionList[this.questionList.length] = question;
      this.createNew(question);
    });

    this.$emitter.on("addTrueFalseQuestion", (question) => {
      this.questionList[this.questionList.length] = question;
      this.createNew(question);
    });

    this.$emitter.on("addFillBlankQuestion", (question) => {
      this.questionList[this.questionList.length] = question;
      this.createNew(question);
    });

    this.$emitter.on("addEssayQuestion", (question) => {
      this.questionList[this.questionList.length] = question;
      this.createNew(question);
    });

    this.$emitter.on("deleteQuestion", (questionId) => {
      const idList = {
        questionId: questionId,
        exerciseId: this.exerciseSelectedId,
      };
      this.deleteQuestionById(idList);
    });

    this.$emitter.on("edit", (question) => {
      this.openTypeQuestion = question.questionType;
    });
  },
  computed: {
    ...mapGetters([
      "exerciseList",
      "loading",
      "subjectList",
      "gradeList",
      "questions",
      "name",
      "exerciseSelectedId",
    ]),
  },
  beforeUnmount() {
    this.$emitter.off("exerciseId");
    this.$emitter.off("closeModalQuestion");
    this.$emitter.off("addSelectQuestion");
    this.$emitter.off("addTrueFalseQuestion");
    this.$emitter.off("addFillBlankQuestion");
    this.$emitter.off("deleteQuestion");
    this.$emitter.off("addEssayQuestion");
    this.$emitter.off("edit");
  },
  components: {
    VCombobox,
    CreateQuestionButton,
    TrueFalseQuestionModal,
    FillBlankQuestionModal,
    EssayQuestionModal,
    SelectQuestionModal,
    CardQuestion,
  },
  data() {
    return {
      questionId: "",
      exercise: {
        exerciseName: "Bài tập mới",
        exerciseImage: "",
        classId: "7c4f14d8-66fb-14ae-198f-6354f958f4c0",
        subjectId: "114b715b-430f-74cd-d5c6-21b180c0988f",
        exerciseStatus: 1,
        exerciseTag: "",
        topicId: "27f91d6c-14b1-6c74-92ef-c9d5c2d91e91",
      },
      isShowSupportText: true,
      typeQuestion: { trueFalse: 2, fillBlank: 3, essay: 4, select: 1 },
      openTypeQuestion: -1,
      questionList: [],
    };
  },
  methods: {
    ...mapActions([
      "createExercise",
      "createQuestion",
      "createMultipleAnswer",
      "getQuestionList",
      "setExerciseSelectedId",
      "deleteQuestionById",
      "completeExercise",
    ]),

    changeStatusExercise() {
      if (this.exerciseSelectedId != "") {
        this.completeExercise(this.exerciseSelectedId);
        this.$router.push("/storage");
        this.$emitter.emit("ShowCompleteToast");
      }
    },

    createNew(question) {
      if (this.exerciseSelectedId == "") {
        axios
          .post(`${BASE_URL}/${CREATE_EXERCISE}`, this.exercise)
          .then((res) => {
            this.createNewQuestion(res.data, question);
            this.setExerciseSelectedId(res.data);
          })
          .catch((err) => console.log(err));
      } else {
        this.createNewQuestion(this.exerciseSelectedId, question);
      }
    },

    closeShowSupportText() {
      this.isShowSupportText = false;
    },
    backToStorageHome() {
      this.$router.push("/storage");
      this.setExerciseSelectedId("");
    },
    CreateQuestion(type) {
      this.openTypeQuestion = type;
    },

    createNewQuestion(id, question) {
      var createdQuestion = {
        questionContent: question.questionContent,
        questionNote: question.questionNote,
        typeQuestion: question.questionType,
        exerciseId: id,
      };
      axios
        .post(`${BASE_URL}/${CREATE_QUESTION}`, createdQuestion)
        .then((res) => {
          this.createNewAnswer(res.data, question);
        })
        .catch((err) => console.log(err));
    },

    createNewAnswer(id, question) {
      var answerList = question.answerList.map((item) => {
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
  watch: {
    questions: function () {
      this.questionList = this.questions;
    },
  },
};
</script>

<style>
@import url("../../../css/main.css");
</style>
