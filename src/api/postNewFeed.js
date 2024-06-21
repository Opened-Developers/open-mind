import openMindAxios from './openMindAxios'

async function postNewFeed(userName) {
  try {
    const response = await openMindAxios.post('/subjects/', {
      name: userName,
      team: '7-7',
    })
    return response
  } catch (error) {
    return error
  }
}

export default postNewFeed
