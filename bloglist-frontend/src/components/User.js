import React from 'react'
import { useSelector } from 'react-redux'


const User = ({ match }) => {
  const users = useSelector(state => state.user.all)

  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <b>added blogs:</b>
      <ul> {user.blogs.length > 0
        ? user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))
        : <div>No added blogs yet</div>}
      </ul>
    </div>
  )
}

export default User