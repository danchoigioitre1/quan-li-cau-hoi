<template>
  <div class="warning-toast-container">
    <div class="line-warn"></div>
    <div class="warn--icon">
      <img
        src="https://sisapapp.misacdn.net/lms/img/ic_warning.950c46da.svg"
        alt=""
      />
    </div>
    <div class="warn-message">{{ text }}</div>
    <button @click="closeToast" class="button--close-warn-toast">
      <img
        src="https://sisapapp.misacdn.net/lms/img/ic_close.bd87de46.svg"
        alt=""
      />
    </button>
  </div>
</template>

<script>
export default {
  name: "VToastWarning",
  props: ["text"],
  methods: {
    closeToast() {
      this.$emitter.emit("closeWarnToast");
    },
  },
};
</script>

<style>
.warning-toast-container {
  width: 500px;
  height: 74px;
  position: fixed;
  top: 20px;
  left: 530px;
  background-color: white;
  border-radius: 20px;
  z-index: 200;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  position: fixed;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  align-items: center;
  padding-left: 20px;
  column-gap: 20px;
}
.warn-message {
  font-size: 14px;
  color: #4e5b6a;
}
.line-warn {
  height: 35px;
  width: 1px;
  border-left: 3px solid #ffd200;
}
.button--close-warn-toast {
  margin-left: 140px;
  cursor: pointer;
  transform: translateY(4px);
}
</style>
