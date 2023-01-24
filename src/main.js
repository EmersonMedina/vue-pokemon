import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(faStar, farStar);

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount("#app");
