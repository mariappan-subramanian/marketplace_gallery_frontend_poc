<script setup>
import { NO_COMMON_HEADER_ROUTES } from "./constants";
import { reactive, computed } from "vue";
import { useGalleryStore } from "./stores/store";

const store = useGalleryStore();

const state = reactive({
  skipDetails: true,
});

const canShowHeaderSection = computed(() => {
  return !NO_COMMON_HEADER_ROUTES.includes(currentRouteName);
});

const isAdmin = computed(() => {
  return store.session.isAdmin;
});

const currentRouteName = computed(() => {
  return this.$route.name;
});

const getDevportalUrl = computed(() => {
  return store.devportalURL;
});
</script>

<template>
  <div class="mp-container">
    <router-link
      to="/"
      custom
      v-slot="{ navigate }"
      v-if="canShowHeaderSection && !skipDetails"
    >
      <span @click="navigate" @keypress.enter="navigate" role="link" class="heading">{{
        $t("texts.header")
      }}</span>
    </router-link>
    <a :href="getDevportalUrl" target="_blank" rel="noopener noreferrer" class="link">
      {{ $t("texts.dev_portal_link") }}
    </a>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.heading {
  font-size: 24px;
  font-weight: 600;
  margin: 30px 0px;
  cursor: pointer;
  display: inline-block;
}
.searchbar {
  margin-bottom: 20px;
}
.link {
  color: #006699;
  font-size: 0.925rem;
  text-decoration: none;
  font-weight: 400;
  margin: 30px 0px;
  line-height: 28px;
  float: right;
  cursor: pointer;
}
</style>
