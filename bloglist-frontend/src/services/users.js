import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error.message)
    return null
  }
}

const all = {
  getAll
}

export default all