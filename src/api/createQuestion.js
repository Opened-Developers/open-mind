import openMindAxios from './openMindAxios'

export default async function createQuestion(feedId, questionBody) {
  try {
    const response = await openMindAxios.post(
      `/subjects/${feedId}/questions/`,
      questionBody
    )
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message)
    }
    throw new Error('서버와의 통신 중 문제가 발생했습니다.')
  }
}
