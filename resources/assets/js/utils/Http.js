/* eslint-disable no-console */
import axios from 'axios'

const API_URL = '/';

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.response.use(
    response => response,
    (error) => {
        // if (error.response.status === 401) {
        //
        // }
        return Promise.reject(error);
    });

export default axios
