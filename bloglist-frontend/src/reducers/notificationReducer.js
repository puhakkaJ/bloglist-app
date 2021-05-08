const initialState = {
  text: null,
  IDt: null,
  num: 1
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    clearTimeout(state.IDt)
    return action.data
  default:
    return state
  }
}

export const setNotification = (text, time, num) => {
  return async dispatch => {
    const IDt = setTimeout(() => {
      dispatch({
        type: 'NEW_NOTIFICATION',
        data: {
          text: null,
          IDt: IDt,
          num: 1
        },
      })
    }, time * 1000)

    dispatch({
      type: 'NEW_NOTIFICATION',
      data: {
        text: text,
        IDt: IDt,
        num: num
      }
    })
  }
}

export default notificationReducer