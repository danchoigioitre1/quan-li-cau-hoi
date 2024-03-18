<template>
  <div class="create-content">
    <button class="button-create">
      <img :src="logo" alt="" />
    </button>
    <span>{{ detail }}</span>
  </div>
</template>

<script>
export default {
  name: "CreateQuestionButton",
  props: ["logo", "detail"],
};
</script>

<style></style>
