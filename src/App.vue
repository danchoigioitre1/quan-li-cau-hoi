<template>
  <TheHeader />
  <TheMain />
</template>

<script>
import TheHeader from "./layouts/common/TheHeader.vue";
import TheMain from "./layouts/common/TheMain.vue";

export default {
  name: "App",
  components: { TheHeader, TheMain },
};
</script>

<style></style>
