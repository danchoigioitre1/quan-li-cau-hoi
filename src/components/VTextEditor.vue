<template>
  <div id="text-editor-container">
    <Ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      @input="createQuestion"
    ></Ckeditor>
    <button class="helper-button" @click="goToHelperPage">
      <img
        src="https://sisapapp.misacdn.net/lms/img/ic_help.6d809294.svg"
        alt=""
      />
    </button>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapGetters } from "vuex";
export default {
  name: "VTextEditor",
  created() {
    if (this.questionMode == 2) {
      this.editorData = this.questionSelected.questionContent;
    }
  },
  beforeUnmount() {},
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p class='fill-question'>Nhập câu hỏi tại đây: <p>",
      editorConfig: {},
      numberBlank: 0,
    };
  },
  methods: {
    goToHelperPage() {
      window.open("https://emishelp.misa.vn/kb/16485/", "_blank");
    },
    createQuestion() {
      this.editorData = this.editorData.replace(
        "<p>Nhập câu hỏi tại đây: <p>",
        ""
      );
      this.$emitter.emit("contentText", this.editorData);
    },
  },
  computed: {
    ...mapGetters(["questionSelected", "questionMode"]),
  },
  watch: {},
};
</script>
<style></style>
