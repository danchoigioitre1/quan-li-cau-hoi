<template>
  <div class="card-container">
    <div>
      <img :src="classAvatar" alt="" class="class--avatar" />
    </div>
    <div class="class-information">
      <div class="main-information">
        <div class="left-information">
          <div class="class-name">{{ className }}</div>
          <div class="class-type--detail">
            <span>
              {{ classType }}
            </span>
          </div>
        </div>
        <div class="sub-infor">
          <button>
            <img
              src="https://sisapapp.misacdn.net/lms/img/ic_AnswerMore.38ee007c.svg"
              alt=""
            />
          </button>
        </div>
      </div>
      <div class="student-number">
        <span>{{ numberStudent }} học sinh</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassCard",
  props: ["className", "classType", "numberStudent", "classAvatar"],
};
</script>

<style>
@import url("../../css/views/ClassHome/class-card.css");
</style>
