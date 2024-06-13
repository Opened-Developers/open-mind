import openmindAxios from './axios'

async function postNewFeed(userName) {
  try {
    const response = await openmindAxios.post('/subjects/', {
      name: userName,
      team: '7-7',
    })
    return response
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return null
}

export default postNewFeed
