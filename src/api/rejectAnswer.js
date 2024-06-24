import openMindAxios from './openMindAxios'

async function rejectAnswer(targetId) {
  try {
    const response = await openMindAxios.patch(`/answers/${targetId}/`, {
      isRejected: true,
    })
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message)
    }
    throw new Error('서버와의 통신 중 문제가 발생했습니다.')
  }
}

export default rejectAnswer
