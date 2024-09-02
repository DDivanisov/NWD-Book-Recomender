import axios from "axios";
const env = require('../../env');

export default () => {
  return axios.create({
    baseURL: env.backendApi
  });
}