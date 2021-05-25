  import axios from 'axios'
const getAPI = axios.create({
    baseURL: 'https://shuttletestserver.herokuapp.com/',
   
})

export { getAPI }