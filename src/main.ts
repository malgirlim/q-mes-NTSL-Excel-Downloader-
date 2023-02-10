import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "./assets/css/app.css";

import VueHtmlToPaper from "vue-html-to-paper";

const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
    "../src/assets/css/landscape.css",
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
};

createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueHtmlToPaper, options)
  .use(Vue3Toasity, {
    autoClose: 3000,
  })
  .mount("#app");
// createApp(App).use(router).use(createPinia()).mount("#app");
