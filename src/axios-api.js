  import axios from 'axios'
const getAPI = axios.create({
    baseURL: 'http://3.108.118.96:8001/',
   
})

export { getAPI }