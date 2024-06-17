import openmindAxios from './openMindAxios'

async function postNewFeed(userName) {
  try {
    const response = await openmindAxios.post('/subjects/', {
      name: userName,
      team: '7-7',
    })
    return response
  } catch (error) {
    return error
  }
}

export default postNewFeed
