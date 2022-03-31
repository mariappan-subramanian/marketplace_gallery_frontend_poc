<script setup>
import CollectionCard from '@common/components/CollectionCard.vue'
import { useGalleryStore } from '@gallery/stores/store'
import { reactive, computed } from 'vue'

const props = defineProps({
  collections: Array,
  initialOffset: Number,
  loadmoreOffset: Number,
})

const state = reactive({
  limit: props.initialOffset,
  showViewMore: true,
  showViewMoreButton: false,
})
const store = useGalleryStore();
const filteredCollections = computed(() => store.collections.slice(0, state.limit))

const handleViewMore = () => {
  state.limit += props.loadmoreOffset;
  state.showViewMore = false;
  state.showViewMoreButton = store.collections.length > state.limit;
}
</script>
<template>
  <div class="container">
    <div class="title">
      {{ $t("texts.collections") }}
      <span class="see-all" v-if="state.showViewMore" @click="handleViewMore">
        {{ $t("texts.view_more") }}
      </span>
    </div>
    <!-- <div class="description">
      We’ve picked popular and useful apps to get you off to a running start
    </div> -->
    <div class="panel">
      <CollectionCard
        v-for="collection of filteredCollections"
        :key="collection.id"
        :description="collection.summary"
        :title="collection.display_name"
        :image="collection.cover_image"
        :product-name="product"
        :collection-name="collection.name"
        :collection-id="collection.id"
        :is-website="isWebsite"
        :display-name="collection.display_name"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  margin: 20px 0px;
}

.title {
  font-size: 1.125rem;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.website {
  .title {
    font-family: var(--font-stack-primary);
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.4;
    color: #0b1320;
  }
  .see-all {
    color: #666666;
    font-size: 0.8125rem;
    text-decoration: none;
    font-family: var(--font-stack-tags);
    float: right;
    cursor: pointer;
  }
}

.description {
  font-family: var(--font-stack-secondary);
  font-size: 0.875rem;
  line-height: 1.29;
  color: #666666;
  margin-top: 2px;
}
.see-all {
  color: #006699;
  font-size: 0.8125rem;
  text-decoration: none;
  font-weight: 400;
  float: right;
  cursor: pointer;
}

.seeAllBtn {
  color: #006699;
  font-size: 0.8125rem;
  height: 30px;
  min-width: 100px;
  border: solid 1px #efefef;
  line-height: 0.5rem;
  margin: 0 auto;
  &:hover,
  &:focus,
  &:active {
    color: #275dc7;
    background-color: var(--sidebar-hover-background, #eaf3fb);
    border: none;
  }
}
</style>
