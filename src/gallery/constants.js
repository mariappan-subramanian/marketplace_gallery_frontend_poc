const freshIdBaseUrl = 'https://accounts.freshworks.com/omnibar';

const PARTNER_URL = 'https://www.freshworks.com/company/partners/find-partners/';

const NO_COMMON_HEADER_ROUTES = ['app_settings_route', 'internal_collection_route'];

// Add App Ids to enable skipDetails feature in Gallery
const AUTO_INSTALLABLE_APPS = {
  development: [],
  test: [],
  staging: ['44829'],
  production: ['16108', '493', '44829'],
};

export {
  freshIdBaseUrl,
  PARTNER_URL,
  NO_COMMON_HEADER_ROUTES,
  AUTO_INSTALLABLE_APPS,
};
