import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {
  const data = { username, password }
  try {
    const response = await axios.post(baseUrl, data)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error.message)
    return null
  }
}

const login2 = {
  login
}

export default login2