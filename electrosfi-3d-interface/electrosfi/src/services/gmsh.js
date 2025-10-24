import axios from "axios";

const gmsh = axios.create({
  baseURL: `${process.env.VUE_APP_GMSH_LOCATION}`
}); 

export default gmsh;