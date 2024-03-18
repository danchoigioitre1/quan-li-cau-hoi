<template>
  <div class="warning-toast-container">
    <div class="line-success"></div>
    <div class="warn--icon">
      <img
        src="https://sisapapp.misacdn.net/lms/img/ic_success.d741d4af.svg"
        alt=""
      />
    </div>
    <div class="warn-message">{{ text }}</div>
    <button @click="closeToast" class="button--close-success-toast">
      <img
        src="https://sisapapp.misacdn.net/lms/img/ic_close.bd87de46.svg"
        alt=""
      />
    </button>
  </div>
</template>

<script>
export default {
  name: "VToastSuccess",
  props: ["text"],
  methods: {
    closeToast() {
      this.$emitter.emit("closeSuccessToast");
    },
  },
};
</script>

<style>
.line-success {
  height: 35px;
  width: 1px;
  border-left: 3px solid #0c9631;
}
.button--close-success-toast {
  transform: translate(170px, 5px);
}
</style>
