import axios from "axios";

const simulator3d = axios.create({
  baseURL: `${process.env.VUE_APP_DATA_BASE_LOCATION}/simulations3d`
});

export default simulator3d;