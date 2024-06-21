import openMindAxios from './openMindAxios'

const limit = Number.MAX_SAFE_INTEGER

async function getFeedListAll() {
  try {
    const response = await openMindAxios.get(`/subjects/?limit=${limit}`)
    return response
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message)
    }
    throw new Error(
      '서버와의 통신 중 문제가 발생했습니다. 인터넷 연결 상태를 확인 후 다시 시도해 주세요.'
    )
  }
}

export default getFeedListAll
