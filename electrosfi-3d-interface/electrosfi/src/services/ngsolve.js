import axios from 'axios';

const ngsolve = axios.create({
    baseURL: process.env.VUE_APP_NGSOLVE_LOCATION
});

export default ngsolve;
