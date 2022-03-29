<template>
  <h2>Users</h2>
</template>

<script>
import { useGalleryStore } from "@/stores/store";

export default {
  setup() {
    const store = useGalleryStore();

    return {
      // you can return the whole store instance to use it in the template
      store,
    };
  },
};
</script>
