<template>
    <div class="wrapper" @click="trackEvents">
      <img :src="image.thumb"
        alt="collection banner image"
        :srcset="`${image.thumb} 1x,
                  ${image.thumb2x} 2x`">
      <div class="details">
        <div class="title line-clamp one">{{title}}</div>
        <div class="description line-clamp two">{{description}}</div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    image: Object,
    productName: String,
    collectionName: String,
    collectionId: Number,
    isWebsite: Boolean,
    displayName: String,
  },

  methods: {
    trackEvents() {
    if (!this.isWebsite) {
          this.$emit('heap-event', {
            id: this.collectionId,
            displayName: this.displayName,
            name: this.collectionName,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: solid 1px #f2f2f2;
  background-color: #ffffff;
  height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    box-shadow: 0 3px 7px -3px rgba(0, 0, 0, 0.15);
  }

  .details {
    height: 85px;
    padding: 10px;
    box-sizing: border-box;

    .title {
      font-weight: 700;
      font-size: 0.875rem;
      color: #000000;
      margin-bottom: 5px;
      overflow: hidden;
      line-height: 1.2rem;
    }
    .description {
      font-size: 0.75rem;
      color: #6F7C87;
      overflow: hidden;
      line-height: 1rem;
      max-height: 1.95rem;
    }
  }
  img {
    width: 100%;
    height: 105px;
    object-fit: cover;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
}

.website {
  &.card {
    .title {
      font-family: var(--font-stack-primary);
      font-size: 1rem;
      font-weight: 600;
      color: #0b1320;
    }
    .description {
      font-family: var(--font-stack-secondary);
      font-size: 0.8rem;
      font-weight: 400;
      color: #666666;
    }
  }
}
</style>
