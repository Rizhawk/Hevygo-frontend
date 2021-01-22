  import axios from 'axios'
const getAPI = axios.create({
    baseURL: 'http://backends.hevygo.com/',
   
})

export { getAPI }