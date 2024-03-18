<template>
  <div class="class-home_container">
    <div class="class-type">
      <button
        :style="
          selectedClassType == classType.formal
            ? 'background-color: #ece7fe; color: var(--header-effect-color)'
            : ''
        "
        @click="selectClassType(classType.formal)"
        class="class"
      >
        {{ this.$ExerciseList.FormalClass }}
      </button>
      <button
        :style="
          selectedClassType == classType.extra
            ? 'background-color: #ece7fe; color: var(--header-effect-color)'
            : ''
        "
        @click="selectClassType(classType.extra)"
        class="class"
      >
        {{ this.$ExerciseList.ExtraClass }}
      </button>
    </div>
    <div class="class--list">
      <ClassCard
        classAvatar="https://sisapapp.misacdn.net/lms/img/classroom5.30c68ae6.jpg"
        className="2A"
        classType="Lớp học chính quy"
        numberStudent="5"
      />
      <ClassCard
        classAvatar="https://sisapapp.misacdn.net/lms/img/classroom5.30c68ae6.jpg"
        className="3A"
        classType="Lớp học chính quy"
        numberStudent="25"
      />
      <ClassCard
        classAvatar="https://sisapapp.misacdn.net/lms/img/classroom12.7715fcbf.jpg"
        className="4A"
        classType="Lớp học chính quy"
        numberStudent="15"
      />
    </div>
  </div>
</template>

<script>
import ClassCard from "../../../views/class-home/ClassCard.vue";
export default {
  name: "ClassHome",
  components: { ClassCard },
  data() {
    return {
      selectedClassType: 1,
      classType: {
        formal: 1,
        extra: 2,
      },
    };
  },
  methods: {
    selectClassType(classType) {
      this.selectedClassType = classType;
    },
  },
};
</script>

<style>
@import url("../../../css/main.css");
</style>
