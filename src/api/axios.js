import axios from 'axios'

const openmindAxios = axios.create({
  baseURL: 'https://openmind-api.vercel.app/7-7',
})

export default openmindAxios
