<script setup>
import { useGalleryStore } from "../stores/store";
import CollectionPanel from "@common/components/CollectionPanel.vue";
import AppGridComponent from "@common/components/AppGridComponent.vue";
import { reactive, computed, watch, onMounted } from 'vue'

const store = useGalleryStore();

const state = reactive({
  initialCount: 9,
  loadMoreCount: 18,
});

</script>
<template>
  <main>
    <CollectionPanel
      v-if="store.collections.length > 0"
      :collections="store.collections"
      :initial-offset="6"
      :loadmore-offset="6"
    />
    <AppGridComponent
      :title="$t('texts.trending')"
      v-if="store.trendingApps.length > 0"
      :apps="store.trendingApps"
      :initial-offset="state.initialCount"
      :loadmore-offset="state.loadMoreCount"
    />
    <AppGridComponent
      :title="$t('texts.popular')"
      :apps="store.popularApps"
      :initial-offset="state.initialCount"
      :loadmore-offset="state.loadMoreCount"
    />
    <AppGridComponent
      :title="$t('texts.latest')"
      :apps="store.latestApps"
      :initial-offset="initialCount"
      :loadmore-offset="loadMoreCount"
    />
    <!-- <AppGridComponent
      :title= "upcomingTitle"
      v-if="upcomingApps.apps"
      :apps="upcomingApps.apps"
      :initial-offset= "3"
      :loadmore-offset= "6"
      is-disabled
    /> -->
  </main>
</template>
