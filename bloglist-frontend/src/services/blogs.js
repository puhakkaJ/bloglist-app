import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

const like = async (blog) => {
  const request = await axios.put(`${baseUrl}/${blog.id}`, { ...blog, likes: blog.likes+1 })
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`,config)
  return request.data
}

const comment = async (blog, text) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, { body: text, id: blog.id })
  return response.data
}

const getAll1 = {
  getAll,
  setToken,
  create,
  update,
  remove,
  like,
  comment
}
export default getAll1