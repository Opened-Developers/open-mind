import axios from './axios'

export default async function getFeedQuestions(feedId) {
  try {
    const response = await axios.get(`/subjects/${feedId}/questions/`) // axios가 반환한 리스폰스 객체를 비구조화 할당으로 분리하여 data만 추출, async-await 문법으로 비동기 처리해서
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message)
    }
    throw new Error('서버와의 통신 중 문제가 발생했습니다.')
  }
}
