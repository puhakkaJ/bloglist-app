import React, { useState, useEffect } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, loginUser, clearUser, initializeUsers } from './reducers/userReducer'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import {
  TextField,
  Button,
  AppBar,
  Toolbar,
} from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'



const Menu = ({ user, handleLogout }) => {
  return (
    <div>
      <AppBar position="static" color="secondary" >
        <Toolbar>
          <ChevronRightIcon color="default" />
          <Button color="inherit" component={Link} to="/">
      blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
      users
          </Button>
          {user.name} logged in  <button type="button" onClick={handleLogout}>logout</button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.now)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(clearUser())
  }
  const usersMatch = useRouteMatch('/users/:id')
  const blogsMatch = useRouteMatch('/blogs/:id')

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <TextField label="username"
              id="username"
              variant="filled"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <TextField label="password"
              id="password"
              variant="filled"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button id='login' variant="contained" color="secondary" type="submit">
            login
          </Button>
        </form>
      </div>
    )
  }

  return (
    <Container>
      <div>
        <Menu user={user} handleLogout={handleLogout}/>
        <Notification />
        <h2>Blog app</h2>
        <Switch>
          <Route exact path="/blogs/:id">
            <br></br>
            <Blog user={user} match={blogsMatch}/>
          </Route>
          <Route exact path="/users/:id">
            <br></br>
            <User match={usersMatch}/>
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route exact path='/'>
            <Blogs user={user} />
          </Route>ß
        </Switch>
      </div>
    </Container>
  )
}

export default App