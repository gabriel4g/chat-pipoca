export default class NotificationHelper {
  type: string
  color: string
  message: string
  icon: string

  typeFlash(type: string) {
    this.type = type
  }

  textFlash(color: string) {
    this.color = color
  }

  messageFlash(message: string) {
    this.message = message
  }

  iconFlash(icon: string) {
    this.icon = icon
  }

  notificationFlash(type, color, message, icon) {
    this.type = type
    this.color = color
    this.message = message
    this.icon = icon
  }

  public status(session, response) {
    session.flash({
      notification: {
        type: this.type,
        text: this.color,
        message: this.message,
        icon: this.icon
      }
    })
    return response.redirect('back')
  }
  public statusHome(session, response) {
    session.flash({
      notification: {
        type: this.type,
        text: this.color,
        message: this.message,
        icon: this.icon
      }
    })
    return response.redirect('/')
  }

  public statusLogin(session, response) {
    session.flash({
      notification: {
        type: this.type,
        text: this.color,
        message: this.message,
        icon: this.icon
      }
    })
    return response.redirect('/login')
  }
}
