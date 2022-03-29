<script setup>
import UserList from "./components/UserList.vue";
import { NO_COMMON_HEADER_ROUTES } from './constants';
import { reactive, computed } from 'vue'
import { useGalleryStore } from "./stores/store"

const store = useGalleryStore();

const state = reactive({
  skipDetails: true
})

const canShowHeaderSection = computed(() => {
  return !NO_COMMON_HEADER_ROUTES.includes(currentRouteName);
})

const isAdmin = computed(() => {
  return store.session.isAdmin;
})

const currentRouteName = computed(() => {
  return this.$route.name;
})

const getDevportalUrl = computed(() => {
  return store.devportalURL
})

</script>

<template>
  <router-link
    tag="span"
    to="/"
    v-if="canShowHeaderSection && !skipDetails"
    class="heading"
  >
    {{ $t("texts.header") }}
  </router-link>
  <a
      :href="getDevportalUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="link"
  >    
      {{ $t('texts.dev_portal_link') }}
      </a>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
