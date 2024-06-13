import openmindAxios from './axios'

async function getFeedList() {
  try {
    const response = await openmindAxios.get('/subjects/')
    return response
  } catch (error) {
    const response = {
      errorMessage: '데이터를 불러오는 데 실패했습니다. 다시 시도해 주세요.',
    }
    return response
  }
}

export default getFeedList
