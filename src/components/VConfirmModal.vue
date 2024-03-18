<template>
  <div class="alert-modal-container">
    <div class="alert-content confirm-modal">
      <div class="alert-title">{{ this.$ExerciseList.EmisTranining }}</div>
      <div class="alert--text">
        <span>{{ text }}</span>
        <button @click="closeAlertModal" class="cancel-alert-button">
          Hủy
        </button>
        <button @click="confirmAction" class="close-alert-button">
          {{ this.$ExerciseList.Agree }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VConfirmModal",
  props: ["text"],
  methods: {
    closeAlertModal() {
      this.$emitter.emit("closeConfirmModal");
    },
    confirmAction() {
      this.$emitter.emit("confirmAction");
      this.closeAlertModal();
    },
  },
};
</script>

<style>
.cancel-alert-button {
  position: absolute;
  width: 113px;
  height: 40px;
  border-radius: 10px;
  background-color: #f1f2f7;
  color: #606266;
  font-size: 14px;
  bottom: 24px;
  right: 150px;
  border: 1px solid #606266;
}
.confirm-modal {
  width: 420px !important;
}
</style>
