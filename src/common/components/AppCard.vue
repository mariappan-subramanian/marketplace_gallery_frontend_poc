<script setup>
import constants from "../constants";
import { onMounted, reactive, computed } from "vue";
const { PRODUCT_MAP } = constants;

const props = defineProps({
  appId: Number,
  thumb: String,
  thumb2x: String,
  displayName: String,
  appName: String,
  collectionId: Number,
  description: String,
  pricing: Boolean,
  type: Number,
  categories: Array,
  lastUpdated: String,
  publishedBy: String,
  options: Object,
  isDisabled: Boolean,
  productName: String,
  showProduct: Boolean,
  disablePopup: Boolean,
  isFreshworksVerified: Boolean,
  tacticId: Number,
});

const state = reactive({
  shareURL: "",
  galleryDetailRouteParams: {},
});

onMounted(() => {
  const baseURL = window.location.origin;
  state.shareURL = `${baseURL}/${props.productName}/${props.appName}`;
  state.galleryDetailRouteParams = { id: props.appId, appName: props.appName };
  if (props.collectionId) {
    state.galleryDetailRouteParams.collectionId = props.collectionId;
  }
});

const filteredCategories = computed(() => [...new Set(props.categories)]);
const productDisplayName = computed(() => PRODUCT_MAP[props.productName].productName);
</script>
<template>
  <div>
    <router-link
      tag="a"
      class="app-card"
      :class="{ 'non-clickable': props.isDisabled }"
      to="/"
    >
      <div @click="trackEvents" class="wrapper">
        <div class="app-icon">
          <img
            class="app-icon-img"
            :src="props.thumb"
            :srcset="`${props.thumb} 1x, ${props.thumb2x} 2x`"
          />
        </div>
        <div class="app-card-text">
          <div class="app-card-header">
            <div class="head">{{ props.displayName }}</div>
            <span class="freshworks-verified" v-show="props.isFreshworksVerified">
              <img src="@common/assets/icons/Verified.svg" alt="verified badge symbol" />
            </span>
          </div>
          <div class="description line-clamp two">{{ props.description }}</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.app-card {
  background: #fff;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0);
  height: 75px;
  display: inline-flex;
  justify-content: flex-start;
  box-sizing: border-box;
  transition: all 200ms;
  padding: 10px;
  min-width: 220px;
  text-decoration: inherit;
  color: inherit;
  width: 100%;

  .wrapper {
    display: contents;
  }

  &.non-clickable {
    &.app-card {
      pointer-events: none;
    }
  }
  &:hover {
    border: solid 1px #efefef;
    background-color: #fafafa;
    cursor: pointer;
    .line-clamp:after {
      background: linear-gradient(to right, rgba(255, 255, 255, 0), #fafafa 50%);
    }
  }

  .app-card-text {
    width: calc(100% - 80px);
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .app-card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    .freshworks-verified {
      margin: 0px 6px;
    }
  }

  &:visited {
    text-decoration: inherit;
    color: inherit;
  }

  .head {
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 2px;
    overflow: hidden;
    line-height: 1.43;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .description {
    font-weight: 300;
    color: #555;
    height: auto;
    word-break: break-all;
    /* Non standard for WebKit */
    word-break: break-word;
    font-size: 0.75rem;
    overflow: hidden;
    line-height: 1.32;
    max-height: 2.2rem;
  }
}

.website {
  .app-card {
    height: 83px;
    .head {
      font-family: var(--font-stack-primary);
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.44;
      height: 1.32rem;
      color: #0b1320;
    }
    .description {
      font-family: var(--font-stack-secondary);
      font-size: 0.8rem;
      font-weight: 400;
      line-height: 1.32;
      color: #666;
    }
    &:hover,
    .active {
      background-color: #f1f1f1;
      border: 1px solid #f1f1f1;
      .head {
        color: #d82b00;
      }
    }
    .app-icon {
      width: 64px;
      height: 64px;
      min-width: 64px;
      min-height: 64px;
      margin-right: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      .app-icon-img {
        width: 48px;
        height: 48px;
      }
    }
  }
  .description {
    font-size: 0.875rem;
  }
}

.pop-over {
  font-family: inherit;
  padding: 2px;
  user-select: none;
  .header {
    display: flex;
    align-items: center;
    border-bottom: 1px dashed #ececec;
    padding-bottom: 12px;
    cursor: pointer;
    text-decoration: none;
    .app-icon {
      width: 54px;
      height: 54px;
      box-shadow: none;
      border: 1px solid #ececec;
      padding: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .app-icon-img {
      width: 45px;
      height: 45px;
    }

    .app-name {
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 2px;
      line-height: 1.43;
      color: #0b1320;
      white-space: pre-wrap;
      text-align: left;
      word-break: break-word;
    }
  }

  .price {
    font-size: 0.875rem;
    line-height: 1.29;
    color: #e37400;
  }

  .details {
    .freshworks-verified {
      display: flex;
      font-size: 0.75rem;
      color: #666666;
      height: 33px;
      line-height: 2.7;
      border-bottom: 1px dashed #ececec;
      span {
        padding-left: 3px;
      }
      img {
        width: 15px;
      }
    }

    .categories {
      margin-top: 12px;
    }

    .details-table {
      margin-top: 12px;
      font-size: 0.75rem;
      color: #697379;
      word-break: break-word;
      text-align: left;
      padding-bottom: 10px;
      border-bottom: 1px dashed #ececec;
      .value {
        text-transform: capitalize;
        vertical-align: top;
      }
      .label {
        width: 82px;
        vertical-align: top;
      }
      a {
        color: #d82b00;
        cursor: pointer;
        text-decoration: none;
      }
    }

    .supported-for {
      padding-bottom: 10px;
      border-bottom: 1px dashed #ececec;
    }

    .description {
      padding-top: 8px;
      font-size: 0.75rem;
      line-height: 1.14;
      color: #666666;
      padding-bottom: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .mp-btn {
      font-family: var(--font-stack-primary);
      border-radius: 2px;
      width: 100%;
      height: 32px;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 0;
      &.mp-btn-install {
        border-radius: 4px;
        // center align the text in safari V10.1 browser
        display: -webkit-box;
        -webkit-box-orient: horizontal;
      }
    }
  }
}
.capitalize {
  text-transform: capitalize;
}
</style>
