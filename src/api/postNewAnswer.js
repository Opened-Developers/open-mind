import openMindAxios from './openMindAxios'

async function postNewAnswer(targetId, targetContent) {
  try {
    const response = await openMindAxios.post(
      `/questions/${targetId}/answers/`,
      {
        questionId: targetId,
        content: targetContent,
        isRejected: false,
        team: '7-7',
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

export default postNewAnswer
