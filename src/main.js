import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import { MotionPlugin } from "@vueuse/motion";
import Tres from "@tresjs/core";

const app = createApp(App);

app.use(router);
app.use(MotionPlugin);
app.use(Tres);

app.mount("#app");