import axios from 'axios'

const openMindAxios = axios.create({
  baseURL: 'https://openmind-api.vercel.app/7-7',
})

export default openMindAxios
