import openmindAxios from './openMindAxios'

export default async function postQuestionReaction(questionId, likeOrDislike) {
  try {
    const response = await openmindAxios.post(
      `/questions/${questionId}/reaction/`,
      {
        type: likeOrDislike,
      }
    )
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message)
    }
    throw new Error('서버와의 통신 중 문제가 발생했습니다.')
  }
}
