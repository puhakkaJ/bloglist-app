import React, { useRef } from 'react'
import { connect, useSelector } from 'react-redux'
import Togglable from './Togglable'
import AddBlogForm from './BlogForm'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog, like, remove } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'


const Blogs = (props) => {
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()

  const addBlogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <AddBlogForm
          createBlog={addBlog}
        />
      </Togglable>
    )
  }

  const addBlog = (blogObject) => {
    console.log(blogObject)
    blogFormRef.current.toggleVisibility()
    props.createBlog(blogObject)
    props.setNotification(`a new blog '${blogObject.title}' by ${blogObject.author} added`,5,2)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid Violet',
    borderWidth: 1.5,
    marginBottom: 5
  }


  return (
    <div>
      {addBlogForm()}
      <br></br>
      <TableContainer component={Paper}>
        <Table>
          <TableBody id='blogs'>
            {blogs.sort((a, b) => a.likes - b.likes).reverse().map(blog => {
              return (<TableRow style={blogStyle} key={blog.id}><TableCell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>)}
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  createBlog,
  like,
  remove
}

const ConnectedBlogs = connect(null, mapDispatchToProps)(Blogs)
export default ConnectedBlogs