import { createRouter, createWebHistory } from "vue-router";

import ClassHome from "@/layouts/page/ClassList/ClassHome";
import StorageHome from "@/layouts/page/StorageHome/StorageHome";

import CreateQuestion from "../layouts/page/StorageHome/CreateQuestion.vue";

const routers = [
  { path: "/classroom", component: ClassHome, name: "ClassHomeRouter" },
  {
    path: "/storage",
    component: StorageHome,
    name: "DocumentHomeRouter",
    children: [
      {
        path: "create",
        components: {
          default: StorageHome,
          StorageRouterView: CreateQuestion,
        },
        props: true,
        name: "CreateQuestionsRouter",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

export default router;
