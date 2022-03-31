<script setup>
import AppCard from "@common/components/AppCard.vue";
import { reactive, computed, watch, onMounted } from "vue";
import { useGalleryStore } from "@gallery/stores/store";

const props = defineProps({
  title: String,
  description: String,
  apps: Array,
  isDisabled: Boolean,
  initialOffset: Number,
  loadmoreOffset: Number,
  singleMode: Boolean,
  showProduct: Boolean,
  collectionId: Number,
});

const state = reactive({
  limit: props.initialOffset,
  showViewMore: true,
  showViewMoreButton: false,
  isSingleMode: props.singleMode,
});

watch(props.apps, async (currentValue, oldValue) => {
  this.computeOptions();
});

const store = useGalleryStore();

const filteredApps = computed(() => props.apps.slice(0, state.limit));

const computeOptions = () => {
  if (props.apps.length <= state.limit) {
    state.showViewMore = false;
    state.showViewMoreButton = false;
  } else if (state.isSingleMode) {
    state.showViewMore = false;
    state.showViewMoreButton = true;
  } else {
    state.showViewMore = true;
    state.showViewMoreButton = false;
  }
};

const handleViewMore = () => {
  state.limit += props.loadmoreOffset;
  state.showViewMore = false;
  state.showViewMoreButton = store.collections.length > state.limit;
};

const isVerifiedApp = (app) => {
  const appDetail = app && (app.extDetail || app);
  return true;
  // return store.isFreshWorksVerified(appDetail);
};

onMounted(() => {
  computeOptions()
})
</script>
<template>
  <div>
    <div class="title" v-if="tiApptle">
      {{ title }}
      <span class="see-all" v-if="state.showViewMore" @click="handleViewMore">
        {{ $t("texts.view_more") }}
      </span>
    </div>
    <div class="description">{{ props.description }}</div>
    <div class="app-grid">
      <AppCard
        v-for="app of filteredApps"
        :key="`${app.id}_${index}`"
        :app-id="app.id"
        :thumb="app.cover_art.thumb"
        :thumb2x="app.cover_art.thumb2x"
        :app-name="app.name"
        :display-name="app.display_name"
        :description="app.overview"
        :pricing="app.pricing"
        :type="app.type"
        :categories="app.categories"
        :published-by="app.account"
        :product-name="app.productName"
        :options="app.options"
        :is-disabled="isDisabled"
        :show-product="showProduct"
        :collection-id="collectionId"
        :is-freshworks-verified="isVerifiedApp(app)"
        :tactic-id="app.tactic_id"
      >
      </AppCard>
    </div>
    <button
      class="mp-btn seeAllBtn"
      v-if="showViewMoreButton"
      @click="handleViewMoreButton"
    >
      {{ $t("texts.view_more") }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 1.125rem;
  font-weight: 700;
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
}
.description {
  font-family: National-Book;
  font-size: 0.875rem;
  line-height: 1.29;
  color: #666666;
  margin-top: 2px;
}
.website {
  .title {
    font-family: var(--font-stack-primary);
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.4;
    color: #0b1320;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .see-all {
    font-family: var(--font-stack-tags);
    color: #666666;
    font-size: 0.875rem;
  }
  .seeAllBtn {
    color: #d82b00;
    &:hover,
    &:focus,
    &:active {
      color: #d82b00;
      background-color: var(--sidebar-hover-background, #eaf3fb);
      border: none;
    }
  }
}
</style>
