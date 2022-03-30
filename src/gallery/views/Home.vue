<script setup>
import { useGalleryStore } from "../stores/store";
import CollectionPanel from "../../common/components/CollectionPanel.vue";

const store = useGalleryStore();
</script>
<template>
  <main>
    <CollectionPanel
      v-if="store.collections.length > 0"
      :collections="store.collections"
      :initial-offset="6"
      :loadmore-offset="6"
    />
  </main>
</template>
