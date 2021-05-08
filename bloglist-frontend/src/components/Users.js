import { useSelector } from 'react-redux'
import React from 'react'
import { Link } from 'react-router-dom'



const Users = () => {
  const users = useSelector(state => state.user.all)

  /*const tdStyle = {
    textAlign: 'center'
  }*/

  return (
    <div>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
          {users.map(u => (
            <tr key={u.username}>
              <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default Users