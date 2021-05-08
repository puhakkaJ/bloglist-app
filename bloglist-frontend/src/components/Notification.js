import React from 'react'
import { connect } from 'react-redux'
import { Alert } from '@material-ui/lab'



const Notification = (props) => {
  const message = props.notification.text
  const num = props.notification.num
  var string = ''

  if (num === 1) {
    string = 'error'
  } else if (num === 2) {
    string = 'warning'
  } else {
    string = 'success'
  }


  if (message === null) {
    return null
  }

  return (
    <div>
      <Alert severity={string}>
        {message}
      </Alert>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)
export default ConnectedNotifications