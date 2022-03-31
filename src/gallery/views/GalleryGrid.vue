<script setup>
import { onMounted } from "vue";
import { useGalleryStore } from "../stores/store";

const store = useGalleryStore();

const loadInitialData = async () => {
  if (store.allApps.length === 0) {
    await store.loadApps();
  }
  await store.loadCollections();
  await store.loadTrendingApps();
};

onMounted(() => {
  loadInitialData();
});
</script>
<template>
  <div class="grid-layout">
    <fw-spinner size="large" color="blue" v-if="!store.isDataFetched"></fw-spinner>
    <div class="content">
      <div class="right-panel">
        <div class="header">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 220px;
  margin-right: 28px;
  min-width: 220px;
}

.content {
  display: flex;
  align-items: stretch;
}

.right-panel {
  flex: 1;
}

.header {
  font-size: 1rem;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 500;
}
</style>
