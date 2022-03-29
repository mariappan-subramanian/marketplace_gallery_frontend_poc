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

<script>
import { useGalleryStore } from "@/stores/store";
import { onMounted } from 'vue'

export default {
  setup() {
    const store = useGalleryStore();
    onMounted(() => {
      store.loadCollections()
    })
    return {
      // you can return the whole store instance to use it in the template
      store,
    };
  },
};
</script>

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
