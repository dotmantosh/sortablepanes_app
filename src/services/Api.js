import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL_PROD;
/* const baseURL = process.env.REACT_APP_BASE_URL_PROD; */
const Api = () => {
  return axios.create({ baseURL });
};
export default Api;
