import axios from "axios";
const getAPI = axios.create({
  baseURL: "https://shuttleapi.rizhawk.com/",
});
export { getAPI };
