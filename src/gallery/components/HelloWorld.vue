<template>
  <div class="greetings">
    <h3>
      You’ve successfully created a project with
      <a target="_blank" href="https://vitejs.dev/">Vite</a> +
      <a target="_blank" href="https://vuejs.org/">Vue 3</a>.
    </h3>
  </div>
</template>

<script>
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { useGalleryStore } from "../stores/store";
import App from '../App.vue'

export default {
  setup() {
    const pinia = createPinia();
    const app = createApp(App);
    app.use(pinia);

    const store = useGalleryStore();

    return {
      // you can return the whole store instance to use it in the template
      store,
    };
  },
};
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
