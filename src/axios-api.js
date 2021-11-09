import axios from "axios";
const getAPI = axios.create({
  baseURL: "http://65.1.30.73/",
});
export { getAPI };
