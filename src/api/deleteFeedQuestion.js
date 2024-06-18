import axios from './axios'

export default async function deleteFeedQuestion(feedId) {
  try {
    const response = await axios.delete(`/questions/${feedId}/`)
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message)
    }
    throw new Error('서버와의 통신 중 문제가 발생했습니다.')
  }
}
