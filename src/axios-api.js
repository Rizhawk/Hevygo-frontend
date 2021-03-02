  import axios from 'axios'
const getAPI = axios.create({
    baseURL: 'http://shuttleserver.rizhawk.com/',
   
})

export { getAPI }