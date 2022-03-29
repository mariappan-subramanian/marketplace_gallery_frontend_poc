<template>
  <main>
    <h2 v-if="store.collections.length > 0">Home</h2>
    <CollectionPanel
      v-if="store.collections.length > 0"
      :collections="store.collections"
      :initial-offset="6"
      :loadmore-offset="6"
    />
  </main>
</template>

<script>
import { useGalleryStore } from "@/stores/store";
import CollectionPanel from "../common/components/CollectionPanel.vue";
export default {
  setup() {
    const store = useGalleryStore();
    return {
      // you can return the whole store instance to use it in the template
      store,
    };
  },
  components: {
    CollectionPanel
  }
};
</script>
