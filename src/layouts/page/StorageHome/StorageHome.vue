<template>
  <div class="storage-container">
    <!--Các nút cố định-->
    <div class="storage_button--div">
      <div class="div_button--left">
        <VButton
          @click="openLeftButton(leftButtonList.individual)"
          :style="
            this.selectLeftButton == leftButtonList.individual
              ? effectSelectButton()
              : ''
          "
          text="Cá nhân"
          class="button--individual storage-button--left"
        />
        <VButton
          @click="openLeftButton(leftButtonList.school)"
          :style="
            this.selectLeftButton == leftButtonList.school
              ? effectSelectButton()
              : ''
          "
          text="Trường học"
          class="button--school storage-button--left"
        />
        <VButton
          @click="openLeftButton(leftButtonList.communication)"
          :style="
            this.selectLeftButton == leftButtonList.communication
              ? effectSelectButton()
              : ''
          "
          text="Cộng đồng"
          class="button--communication storage-button--left"
        />
      </div>
      <div class="div_button--right">
        <VButton text="Chia sẻ" class="share-button" />
        <VButton text="Tạo trò chơi" class="create-button" />
        <VButton text="Soạn bài" class="composing-button" @click="goToCreate" />
      </div>
    </div>

    <!--poster-->
    <div class="poster-container">
      <div class="teacher-positive">
        <div>{{ this.$ExerciseList.PositiveTeacher }}</div>
        <img
          src="https://sisapapp.misacdn.net/lms/img/Layer_Category_3.e59f16ba.png"
          alt=""
        />
      </div>
      <div class="poster-content">
        <div class="content--number">162</div>
        <div class="content--title">{{ this.$ExerciseList.DocEditer }}</div>
      </div>
      <div class="poster-content">
        <div class="content--number">19</div>
        <div class="content--title">{{ this.$ExerciseList.DocShared }}</div>
      </div>
      <div class="poster-content">
        <div class="content--number">255</div>
        <div class="content--title">{{ this.$ExerciseList.DocUser }}</div>
      </div>
      <div class="share-more">
        Chia sẻ thêm <span>12</span> học liệu nữa thăng hạng lên
        <span>GIÁO VIÊN SÁNG TẠO</span>
      </div>
    </div>
    <!--Filter-->
    <div>
      <div class="div_input-doc">
        <span
          ><img
            src="https://sisapapp.misacdn.net/lms/img/icon_search.0273bbde.svg"
            alt=""
        /></span>
        <input
          type="text"
          class="input-doc"
          placeholder="Nhập tên học liệu để tìm kiếm"
          v-model="objectFilter.exerciseName"
        />
      </div>
      <div class="combobox-div">
        <VCombobox
          :listData="statusList"
          field="exerciseStatus"
          placeholder="Tất cả học liệu"
        />
        <VCombobox
          :listData="subjectList"
          field="subjectName"
          placeholder="Tất cả các môn"
        />
        <VCombobox
          :listData="gradeList"
          field="gradeName"
          placeholder="Tất cả khối"
        />
      </div>
      <div class="ex-card">
        <SubjectCard
          :subject="exercise.subjectName"
          :grade="exercise.gradeName"
          :name="exercise.exerciseName"
          :status="exercise.exerciseStatus"
          :id="exercise.exerciseId"
          v-for="exercise in exerciseList"
          :key="exercise.exerciseId"
        ></SubjectCard>
      </div>
    </div>

    <VButton
      @click="showMoreData"
      text="Xem thêm"
      class="composing-button component--button watch-more-button"
    />

    <VLoading v-if="loading" />
    <VToastSuccess :text="toastText" v-if="showSuccessToast" />
    <VConfirmModal
      text="Bạn có chắc chắn muốn xóa bài không?"
      v-if="showConfirmModal"
    />
    <router-view name="StorageRouterView"></router-view>
  </div>
</template>

<script>
import VButton from "../../../components/VButton.vue";
import VCombobox from "../../../components/VCombobox.vue";
import SubjectCard from "../../../views/storage-home/SubjectCard.vue";
import VLoading from "../../../components/Vloading.vue";

import { mapGetters, mapActions } from "vuex";
import VToastSuccess from "@/components/VToastSuccess.vue";
import VConfirmModal from "@/components/VConfirmModal.vue";
export default {
  name: "StorageHome",
  components: {
    VButton,
    VCombobox,
    SubjectCard,
    VLoading,
    VToastSuccess,
    VConfirmModal,
  },

  created() {
    this.$emitter.on("ShowCompleteToast", () => {
      this.toastText = "Chúc mừng bạn đã hoàn thành bài tập ";
      this.showSuccessToast = true;
      setTimeout(() => {
        this.showSuccessToast = false;
      }, 5000);
    });

    this.$emitter.on("selectItemCombobox", (item, field) => {
      if (field != "exerciseStatus") {
        this.objectFilter[field] = item.value;
      } else {
        this.objectFilter.exerciseStatus = item.id;
      }
    });

    this.$emitter.on("clearValueCombobox", (field) => {
      delete this.objectFilter[field];
    });

    this.$emitter.on("closeConfirmModal", () => {
      this.showConfirmModal = false;
    });
    this.$emitter.on("closeSuccessToast", () => {
      this.showSuccessToast = false;
    });
    this.$emitter.on("deleteExercise", (id) => {
      this.showConfirmModal = true;
      this.deleteId = id;
    });
    this.$emitter.on("confirmAction", () => {
      this.deleteExerciseById(this.deleteId);
      this.toastText = "Xóa bài tập thành công !!!";
      this.showSuccessToast = true;
      setTimeout(() => {
        this.showSuccessToast = false;
      }, 2000);
    });

    this.getExerciseList({
      pageSize: 6,
      pageNumber: 1,
    });
    this.getSubjectList();
    this.getGradeList();
  },
  beforeUnmount() {
    // this.$emitter.off("getDetailExercise");
    this.$emitter.off("selectItemCombobox");
    this.$emitter.off("confirmAction");
    this.$emitter.off("closeConfirmModal");
    this.$emitter.off("deleteExercise");
    this.$emitter.off("closeSuccessToast");
  },
  data() {
    return {
      toastText: "",
      exerciseMode: {
        watch: 1,
        create: 2,
      },
      deleteId: "",
      showSuccessToast: false,
      showConfirmModal: false,
      objectFilter: {
        pageSize: 6,
        pageNumber: 1,
        exerciseName: "",
      },
      statusList: [
        { value: "Đang soạn", id: "1" },
        { value: "Đã soạn", id: "2" },
      ],
      leftButtonList: {
        individual: 1,
        school: 2,
        communication: 3,
      },
      selectLeftButton: 1,
    };
  },
  computed: {
    ...mapGetters(["exerciseList", "loading", "subjectList", "gradeList"]),
  },
  methods: {
    ...mapActions([
      "getExerciseList",
      "getSubjectList",
      "getGradeList",
      "deleteExerciseById",
      "setExerciseMode",
    ]),

    goToCreate() {
      this.$router.push("storage/create");
      this.setExerciseMode(this.exerciseMode.create);
    },
    effectSelectButton() {
      return "background-color: rgb(236,231, 254); color: var(--header-effect-color);";
    },
    openLeftButton(select) {
      this.selectLeftButton = select;
    },
    showMoreData() {
      this.objectFilter.pageSize += 6;
    },
  },
  watch: {
    objectFilter: {
      handler: function (newValue) {
        const timeoutId = window.setTimeout(() => {}, 0);
        for (let id = timeoutId; id >= 0; id -= 1) {
          window.clearTimeout(id);
        }
        setTimeout(() => {
          this.getExerciseList(newValue);
        }, 500);
      },
      deep: true,
    },
  },
};
</script>

<style>
@import url("../../../css/main.css");
.combobox-div {
  display: flex;
  margin: 10px 0;
  column-gap: 15px;
}
</style>
