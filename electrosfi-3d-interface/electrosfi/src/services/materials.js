import axios from 'axios';

const materials = axios.create({
    baseURL: `${process.env.VUE_APP_DATA_BASE_LOCATION}/materials`
});

export default materials;