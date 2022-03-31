import { createPinia, defineStore } from 'pinia'
import DataService from '@gallery/api/DataService'

let initData = null

export const createStore = sessionData => {
    sessionData = sessionData.session;
    initData = {
        isDataFetched: false,
        allApps: [],
        allInstalledApps: [],
        allCustomApps: [],
        allAppRequests: [],
        featuredApps: {},
        collections: [],
        internalCollections: [],
        collectionDetails: {},
        trendingApps: {},
        upcomingApps: {},
        searchText: '',
        categoryOptions: [],
        appDirectory: {},
        selectedCategory: '',
        apps: {},
        appConfigs: {},
        accountDetails: {},
        oauthConfigs: {},
        productConfigs: {},
        seeAllLatest: false,
        seeAllPopular: false,
        limitCount: 9,
        session: {
            productId: sessionData.product_id,
            pod: sessionData.pod,
            accountDomain: sessionData.account_domain,
            productName: sessionData.product_name,
            isCustomAppsEnabled: sessionData.isCustomAppsEnabled == null
                ? true
                : sessionData.isCustomAppsEnabled,
            sessionState: sessionData.sessionState,
            sessionToken: sessionData.sessionToken,
            clientId: sessionData.clientId,
            org: sessionData.org,
            locale: sessionData.locale,
            bundle_id: sessionData.bundle_id,
            productContext: sessionData.productContext,
            authType: sessionData.authType,
            isAdmin: sessionData.isAdmin,
        },
    }
    return createPinia()
}

const getDomain = (accountDomain = '') => {
    // eslint-disable-next-line no-useless-escape
    const urlRegEx = /^(http[s]?:\/\/)?([^:^\/]+)/;
    const domainMatch = urlRegEx.exec(accountDomain.trim());
    const domainGroupIndex = 2;
    return domainMatch ? domainMatch[domainGroupIndex] : '';
};

export const useGalleryStore = defineStore('gallery', {
    id: 'gallery',
    state: () => initData,
    getters: {
        isFreshWorksVerified({ type, short_description }) {
            // Note: for the temporary removal of freshworks badge used short_description.
            return (short_description !== 'hackathon-covid-19') && (type === 1 || type === 4);
        },
        popularApps: (state) => {
            const apps = state.allApps.slice();
            apps.sort((a, b) => b.install_count - a.install_count);
            return apps;
        },
        latestApps: (state) => {
            const apps = state.allApps.slice();
            apps.sort((a, b) => (new Date(b.published_at)) - (new Date(a.published_at)));
            return apps;
        },
        isProductAuth: (state) => (state.session.authType === 'productAuth'),
        // eslint-disable-next-line object-curly-newline
        devportalURL: (state, isProductAuth) => {
            // eslint-disable-next-line object-curly-newline, camelcase
            const { org, pod, accountDomain, productName, bundle_id } = state.session;

            // eslint-disable-next-line camelcase
            const isBundleProduct = !!bundle_id;
            const isStandaloneProduct = (accountDomain != null);
            const isAMP2Supported = () => {
                const AMP2_SUPPORTED_PRODUCT = ['freshcaller', 'freshteam', 'freshdesk', 'freshchat', 'freshservice', 'freshsales', 'freshworks_crm'];
                return (AMP2_SUPPORTED_PRODUCT.includes(state.session.productName));
            };

            if (isAMP2Supported() && !isProductAuth) {
                const amp2Url = new URL('https://developers-dev.freshworks.com/account/');
                amp2Url.searchParams.set(productName === 'freshworks_crm' ? 'org' : 'domain', getDomain(accountDomain));
                amp2Url.searchParams.set('pod', pod);

                return amp2Url;
            }

            const amp1Url = new URL('https://dev-fa-dev-staging.freshcloud.io/freshid/login');

            let domain;

            if (pod != null) {
                amp1Url.searchParams.set('pod', pod);
            }

            if (isBundleProduct) {
                amp1Url.searchParams.set('org', org);
                amp1Url.searchParams.set('bundle_id', bundle_id);
            } else if (isStandaloneProduct) {
                domain = getDomain(accountDomain);
                amp1Url.searchParams.set('account_domain', domain);
            }

            if (productName === 'freshdesk' && isProductAuth) {
                amp1Url.pathname = `/dashboard/${domain}/login`;
            }
            return amp1Url;
        },
    },
    actions: {
        setAppDirectory(payload) {
            this.appDirectory = payload
        },
        resetDataFetchFlag() {
            this.isDataFetched = false;
        },
        setCollections(payload) {
            this.collections = payload;
        },
        setApps(payload) {
            this.allApps = payload;
        },
        setTrendingApps(payload) {
            this.trendingApps = payload;
        },
        setUpcomingApps(payload) {
            this.upcomingApps = payload;
        },
        dataFetchComplete() {
            this.isDataFetched = true;
        },
        isDataFetched: () => this.isDataFetched,
        async loadCollections(state) {
            this.resetDataFetchFlag(state)
            const response = await DataService.getCollections();
            this.setCollections(response)
            this.dataFetchComplete()
            return response;
        },
        async loadApps(state) {
            this.resetDataFetchFlag(state)
            const response = await DataService.getApps();
            this.setApps(response.extensions)
            this.dataFetchComplete()
            return response;
        },
        async loadTrendingApps(state) {
            this.resetDataFetchFlag(state)
            const response = await DataService.getTrendingApps();
            this.setTrendingApps(response)
            this.dataFetchComplete()
            return response;
        },
        async loadUpcomingApps(state) {
            this.resetDataFetchFlag(state)
            const response = await DataService.getUpcomingApps();
            this.setUpcomingApps(response)
            this.dataFetchComplete()
            return response;
        },
    }
})
