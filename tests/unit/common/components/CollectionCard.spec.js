import { mount } from '@vue/test-utils';
import CollectionCard from '@common/components/CollectionCard.vue';
import { createRouter, createWebHistory } from 'vue-router'
import { collectionCardProps } from '@common/mock-data';
import { enableAutoUnmount } from '@vue/test-utils'

describe('CollectionCard.vue', () => {
  let propsData;
  let router;
  const routerData = {
    routes: [{
      path: '/collection',
      name: 'collection_route',
    }],
  };
  let wrapper;

  beforeEach(() => {
    propsData = collectionCardProps;
    router = createRouter({
        history: createWebHistory('/'),
        routes: routerData.routes
    })
    wrapper = mount(CollectionCard, {
      propsData,
      router,
    });
  });

  enableAutoUnmount(afterAll);

  it('renders collection card when props are supplied', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
