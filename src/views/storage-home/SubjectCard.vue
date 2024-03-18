<template>
  <div class="subject-card_container">
    <div class="subject-poster">
      <div class="subject-tooltip">
        <span>{{ this.$ExerciseList.Grade }} {{ grade }} - {{ subject }}</span>
      </div>
      <img
        src="../../../../Fresher-GD2/resource/subjects-avatar/nguvan.png"
        alt=""
      />
    </div>
    <div class="subject-information">
      <div class="intro-name">
        <span class="exercise-name">{{ name }}</span>
        <button @click="openSupportFeature">
          <img
            src="https://sisapapp.misacdn.net/lms/img/icon_option.90d8b4a5.svg"
            alt=""
          />
        </button>

        <!--Modal chức năng-->
        <div
          v-click-outside="closeModalSupport"
          v-if="isOpenModalSupport"
          class="feature-modal"
        >
          <span @click="getDetailExercise">{{ this.$ExerciseList.Watch }}</span>
          <span @click="deleteExercise">{{ this.$ExerciseList.Delete }}</span>
        </div>
      </div>

      <div class="questions-number">
        <!-- <div class="number">
          <img
            src="https://sisapapp.misacdn.net/lms/img/ic_number_aswer.e4999537.svg"
            alt=""
          />
          <span>5 cau hoi</span>
        </div> -->
        <div class="exercise-status" v-if="status == 1">
          <span>Đang soạn</span>
        </div>
      </div>
      <div class="author">
        <img
          src="https://sisapapp.misacdn.net/lms/img/ic_User_16.2bc4d930.svg"
          alt=""
        />
        <span class="exercise-author">Nguyễn Việt Anh</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SubjectCard",
  props: ["subject", "grade", "name", "status", "id"],
  data() {
    return {
      isOpenModalSupport: false,
    };
  },
  methods: {
    ...mapActions([
      "setExerciseMode",
      "setExerciseSelectedId",
      "setExerciseSelected",
    ]),
    getDetailExercise() {
      this.$router.push("storage/create");
      this.setExerciseMode(1);
      this.setExerciseSelectedId(this.id);
      // this.setExerciseSelected({exerciseName:})
      // this.$emitter.emit(
      //   "getDetailExercise",
      //   this.id,
      //   this.name,
      //   this.grade,
      //   this.subject
      // );
    },
    deleteExercise() {
      this.$emitter.emit("deleteExercise", this.id);
    },
    openSupportFeature() {
      this.isOpenModalSupport = !this.isOpenModalSupport;
    },
    closeModalSupport() {
      this.isOpenModalSupport = false;
    },
  },
};
</script>

<style></style>
