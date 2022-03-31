import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from './stores/store'
import DataService from './api/DataService'
import router from './router'
import { i18n } from './i18n-setup'
import '@gallery/styles/style.scss';

DataService.getSession().then(sessionData => {
    const app = createApp(App)
    app.use(createStore(sessionData)).use(router).use(i18n).mount('#app')
}).catch(() => {
    // TODO: need to refactor this in create session route and not here.
    const qps = window.location.hash.split('?')[1] || '';
    if (qps.includes('route')) {
        const qpArr = qps.split('&');
        const qpObj = {};
        qpArr.forEach((qp) => {
            const qpValues = qp.split('=') || [];
            qpObj[qpValues[0]] = qpValues[1] || '';
        });
        // To avoid error on JSON.Parse, default value set as '{}'
        const {
            param, pod, route, freshID, locale, option = '{}',
        } = qpObj;

        const decodedOption = decodeURI(option);

        localStorage.setItem('initialMkpRoute', route);
        localStorage.setItem('initialMkpRouteOption', decodedOption);
        const isFreshId = freshID !== undefined ? `&freshID=${freshID}` : '';
        const isLocale = locale !== undefined ? `&locale=${locale}` : '';
        const url = `${process.env.VUE_APP_SERVICE_URL || ''}/marketplace?params=${param}&pod=${pod}${isLocale}${isFreshId}`;

        window.location.assign(url);
    } else {
        document.write(`
        <div style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;margin: auto;text-align: center;padding: 50 0;font-size: 20px;">
          Problem with session - If this issue persists, please contact <a href="mailto:marketplace-support@freshworks.com"> support</a>
        </div>
      `);
    }
});
