<template>
  <div class="alert-modal-container">
    <div class="alert-content">
      <div class="alert-title">{{ this.$ExerciseList.EmisTranining }}</div>
      <div class="alert--text">
        <span>{{ text }}</span>
        <button @click="closeAlertModal" class="close-alert-button">
          {{ this.$ExerciseList.Agree }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VAlertModal",
  props: ["text"],
  methods: {
    closeAlertModal() {
      this.$emitter.emit("closeAlertModal");
    },
  },
};
</script>

<style>
.alert-modal-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.623);
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
}
.alert-content {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  width: 354px;
  height: 200px;
}
.alert-title {
  padding: 10px 16px;
  font-size: 15px;
  background-color: #eaebf5;
}
.close-alert-button {
  position: absolute;
  width: 113px;
  height: 40px;
  border-radius: 10px;
  background-color: #8a6bf6;
  color: white;
  font-size: 14px;
  bottom: 24px;
  right: 24px;
}
.alert--text {
  padding: 24px;
}
.alert--text span {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.73);
}
</style>
