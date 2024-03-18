import { createApp } from "vue";
import App from "./App.vue";
import ExerciseList from "./js/resources/exercise-list/vn";
import router from "./router";
import CKEditor from "@ckeditor/ckeditor5-vue";
import emitter from "tiny-emitter/instance";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import store from "./vueX/store";

const vuetify = createVuetify({
  components,
  directives,
});
export const app = createApp(App);
app.config.globalProperties.$ExerciseList = ExerciseList;
app.config.globalProperties.$router = router;
app.config.globalProperties.$emitter = emitter;
app.use(store);
app.use(router);
app.use(CKEditor);
app.use(vuetify);
app.mount("#app");
