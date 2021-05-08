import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { remove, like, comment } from '../reducers/blogReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'


const Blog = ({ user, match }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(state => state.blogs)

  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  if (!blog) {
    return null
  }

  const updateLikes = async () => {
    const blog1 = blogs.find(b => b.id === blog.id)
    const blogObject = { ...blog1, likes: (blog1.likes +1) , id: blog.id }
    dispatch(like(blogObject))
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      dispatch(remove(blog.id))
      dispatch(setNotification(`Blog '${blog.title}' was succesfully deleted`,5,2))
      history.push('/')
    }
  }

  const commentBlog = e => {
    const commentGot = e.target.comment.value
    e.target.comment.value = ''
    dispatch(comment(blog, commentGot))
    dispatch(setNotification('You added a comment',5,2))
  }

  return (
    <div className='blog'>
      <div id='blog1'>
        <span>
          <div>
            <h2> {blog.title} by {blog.author}</h2>
            <div>
              <a href={blog.url}>{blog.url}</a>
              <br></br>
              <br></br>
              <div id='likes'>
                likes {blog.likes}
                <button id='like' type="button" onClick={updateLikes}>like</button>
              </div>
              added by {blog.user.name}
            </div>
            {user.name === blog.user.name
              ? (<div>
                <button className={'remove_button'} type="button" onClick={removeBlog}>remove</button>
              </div>)
              : (<div></div>)}
          </div>
        </span>
        <h3>comments:</h3>
        <form onSubmit={commentBlog}>
          <input type='text' name='comment' />
          <button type='submit'>add comment</button>
        </form>
        {blog.comments.length > 0
          ? <ul>{blog.comments.map(com => (
            <li key={com.id}>{com.body}</li>
          ))}</ul>
          : <div>No added comments yet</div>}
      </div>
    </div>
  )
}

export default Blog