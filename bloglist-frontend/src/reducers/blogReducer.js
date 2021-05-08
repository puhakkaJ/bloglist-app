import blogService from '../services/blogs'


export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: { ...newBlog, comments: [] },
    })
  }
}

export const like = (blog) => {
  return async dispatch => {
    console.log(blog)
    const liked = await blogService.like(blog)
    console.log(liked)
    dispatch({
      type: 'LIKE',
      data: { ...blog }
    })
  }
}

export const remove = (id) => {
  return async dispatch => {
    const removedBlog = await blogService.remove(id)
    console.log(removedBlog)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const comment = (blog, comment) => {
  return async dispatch => {
    const commentedBlog = await blogService.comment(blog, comment )
    console.log(commentedBlog)
    dispatch({
      type: 'ADD_COMMENT',
      data: commentedBlog,
      id: blog.id
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'LIKE':
    return state.map(blog => blog.id === action.data.id ? { ...blog, likes: blog.likes+1 } : blog)
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    return action.data
  case 'REMOVE':
    console.log(state.filter(blog => blog.id !== action.data.id))
    return state.filter(blog => blog.id !== action.data)
  case 'ADD_COMMENT':
    console.log(state.find(blog => blog.id === action.id))
    console.log(state.map(blog => blog.id === action.id ? { ...blog, comments: blog.comments.concat(action.data) } : blog))
    return state.map(blog => blog.id === action.data.id ? { ...blog, comments: blog.comments.concat(action.data) } : blog)
  default: return state
  }
}

export default reducer