export const appCardProps = {
    appId: 101,
    thumb: '',
    thumb2x: '',
    displayName: 'Test App',
    appName: 'test_app',
    description: 'This is a Test Description',
    pricing: false,
    type: 1,
    categories: ['Advanced Ticketing'],
    lastUpdated: '2018-03-14T13:06:16.000+05:30',
    publishedBy: '',
    options: {},
    isWebsite: false,
    productName: '',
  };
  
  export const appDetailsInfoProps = {
    description: 'sample description',
    instructions: 'sample Instructions',
  };
  
  export const appDetailsMediaGalleryProps = {
    images: [{
      src: 'https://dok576e5rtq6d.cloudfront.net/images/9402/live_screenshot/large2x/1200_900.jpg',
      thumb: 'https://dok576e5rtq6d.cloudfront.net/images/9402/live_screenshot/large/1200_900.jpg',
    }],
  };
  
  export const appGridComponentProps = {
    title: 'Latest',
    description: 'Latest apps from marketplace',
    apps: [
      { name: 'regular-live_category', cover_art: {} },
      { name: 'ext-live-category', cover_art: {} },
      { name: 'app-assign-stag-test-2', cover_art: {} },
      { name: 'app-assign-stag-test-2', cover_art: {} },
    ],
    isWebsite: false,
    initialOffset: 3,
    loadmoreOffset: 4,
    singleMode: true,
    showProduct: false,
  };
  
  export const collectionCardProps = {
    title: 'test title',
    description: 'test desc',
    image: {},
    collectionId: 1,
    productName: 'test product name',
    collectionName: 'collection name',
  };
  
  export const collectionPanelProps = {
    collections: [
      { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 },
    ],
    initialOffset: 6,
    loadmoreOffset: 7,
    product: 'freshdesk',
    singleMode: true,
  };
  
  export const featuredAppsCardProps = {
    appId: 101,
    thumb: 'https://dok576e5rtq6d.cloudfront.net/images/9402/live_screenshot/large/1200_900.jpg',
    thumb2x: 'https://dok576e5rtq6d.cloudfront.net/images/9402/live_screenshot/large2x/1200_900.jpg',
    displayName: 'test display name',
    appName: 'abc',
    description: 'app from freshworks',
    productName: 'freshdesk',
    showProduct: true,
    color: '',
  };
  
  export const featuredAppsCardPanelProps = {
    apps: [
      {
        id: 1,
        cover_art: {},
        name: 'instagram',
      },
      {
        id: 2,
        cover_art: {},
        name: 'facebook',
      },
    ],
    title: 'test title',
    description: 'hello',
  };
  
  export const socialShareProps = {
    title: 'test',
    description: 'test desc',
    url: 'http://example.com',
  };
  
  export const productName = {
    normalCase: 'freshdesk',
    titleCase: 'Freshdesk',
  };
  