import axios from 'axios';

const simulator = axios.create({
    baseURL: process.env.VUE_APP_SIMULATOR_LOCATION
});

export default simulator;
