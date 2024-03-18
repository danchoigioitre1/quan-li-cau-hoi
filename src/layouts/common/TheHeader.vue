<template>
  <div class="header__div--container">
    <div class="left-header--content">
      <div class="indexing-content">
        <img
          src="https://sisapapp.misacdn.net/lms/img/ic_chart.870683b6.svg"
          alt=""
        />
        <span>{{ this.$ExerciseList.Overview }}</span>
      </div>
      <router-link to="/classroom" class="indexing-content">
        <img
          src=" https://sisapapp.misacdn.net/lms/img/ic_home.47a0479b.svg"
          alt=""
        />
        <span>{{ this.$ExerciseList.Class }}</span>
      </router-link>
      <router-link to="/storage" class="indexing-content">
        <img
          src="https://sisapapp.misacdn.net/lms/img/ic_multi.7d8b269c.svg"
          alt=""
        />
        <span>{{ this.$ExerciseList.Document }}</span>
      </router-link>
      <div class="indexing-content">
        <img
          src="https://sisapapp.misacdn.net/lms/img/ic_multi.7d8b269c.svg"
          alt=""
        />
        <span>{{ this.$ExerciseList.TrainingMISAEMIS }}</span>
      </div>
    </div>
    <div class="right-header--content">
      <img
        class="right_content--icon"
        src="https://sisapapp.misacdn.net/lms/img/ic_Material.0dcea9c1.svg"
        alt=""
      />

      <img
        class="right_content--icon"
        src="https://sisapapp.misacdn.net/lms/img/ic_Setting_24.425ce083.svg"
        alt=""
      />
      <div class="tooltip">{{ this.$ExerciseList.Setting }}</div>
      <img
        class="right_content--icon"
        src="https://sisapapp.misacdn.net/lms/img/ic_Help_20.fbed8b0e.svg"
        alt=""
      />
      <div class="tooltip help">{{ this.$ExerciseList.Help }}</div>
      <img
        class="right_content--icon"
        src="https://sisapapp.misacdn.net/lms/img/ic_Noti_24.9f8729e8.svg"
        alt=""
      />
      <div class="tooltip alert">{{ this.$ExerciseList.Alert }}</div>
      <div class="user-information">
        <p>{{ this.$ExerciseList.Hello }}, <span>Anh</span></p>
        <img
          class="avatar"
          src="https://img.hoidap247.com/picture/question/20200511/large_1589193487217.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>

<style>
@import url("../../css/main.css");
</style>
