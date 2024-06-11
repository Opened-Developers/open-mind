import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://openmind-api.vercel.app/7-7',
})

export default instance
