import { useState } from 'react'


export default class NotificationHelper {
  [notification, setNotification]
  [notification, setNotification] = useState("")
  renderNotification = (color, message) => {
    setNotification(
      <Notification 
        color={color}
        message={message}
      />
    )
  }
}