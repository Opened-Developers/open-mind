import openmindAxios from './openMindAxios'

async function editAnswer(targetId, targetContent) {
  try {
    const response = await openmindAxios.put(`/answers/${targetId}/`, {
      content: targetContent,
      isRejected: false,
    })
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message)
    }
    throw new Error('서버와의 통신 중 문제가 발생했습니다.')
  }
}

export default editAnswer
