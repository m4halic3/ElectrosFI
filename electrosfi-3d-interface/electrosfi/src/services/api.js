import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.VUE_APP_DATA_BASE_LOCATION}/simulations`
});

export default api;