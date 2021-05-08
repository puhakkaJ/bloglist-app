import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const initialState = {
  now: null,
  all: []
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login(username, password)
    console.log(user)
    if (user) {
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      dispatch(setNotification(`welcome ${user.username}`,5,3))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN_USER',
        data: user,
      })
    } else {
      dispatch(setNotification('wrong username or password',5,1))
    }
  }
}

export const setUser = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user,
    })
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

export const clearUser = () => {
  return async dispatch => {
    try {
      window.localStorage.removeItem('loggedNoteappUser')
      dispatch(setNotification('you logged out... See you next time',5,3))
      blogService.setToken('')
      dispatch({
        type: 'CLEAR_USER',
        data: null
      })
    } catch (exception) {
      console.log(exception.message)
      dispatch(setNotification('logout failed',5,1))
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN_USER':
    return { ...state, now: action.data }
  case 'SET_USER':
    return { ...state, now: action.data }
  case 'CLEAR_USER':
    return { ...state, now: action.data }
  case 'INIT_USERS':
    return { ...state, all: action.data }
  default: return state
  }
}

export default reducer