import axios from 'axios';
const baseUrl = 'http://localhost:5000';
const FORBIDDEN_STATUS = 403;

const CSRF_TOKEN_HEADER = 'X-CSRF-TOKEN';
const headers = {
    "accept": "application/json",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
}

const addIdInAppList = (data) => {
    const appInfo = { ...data };
    if (appInfo.apps) {
      appInfo.apps = appInfo.apps.map((app) => ({ id: app.extension_id, ...app }));
    }
    return appInfo;
}

const DataService = {
    getSession() {
        return axios.get(`${baseUrl}/session`, {
            withCredentials: true, headers
        })
            .then((res) => {
                axios.defaults.headers.common['X-CSRF-TOKEN'] = res.data.csrf_token;
                return res.data;
            });
    },
    async getCollections() {
        return axios.get(`${baseUrl}/apps/collections`, { withCredentials: true, headers })
            .then((res) => res.data);
    },
    async getApps() {
        return axios.get(`${baseUrl}/apps/extensions`, { withCredentials: true, headers })
          .then((res) => res.data);
    },
    async getTrendingApps() {
        return axios.get(`${baseUrl}/apps/trending`, { withCredentials: true, headers })
            .then(({ data }) => addIdInAppList(data));
    },
    async getUpcomingApps() {
        return axios.get(`${baseUrl}/apps/upcoming`, { withCredentials: true, headers })
          .then(({ data }) => addIdInAppList(data));
    },
}

axios.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    originalRequest.retry = (originalRequest.retry || 0) + 1;

    if (error.response.status === FORBIDDEN_STATUS && originalRequest.retry <= 3) {
        await DataService.getSession();

        originalRequest.headers[CSRF_TOKEN_HEADER] = axios.defaults.headers.common[CSRF_TOKEN_HEADER];
        return axios(originalRequest);
    }
    return Promise.reject(error);
});

export default DataService;