export default class Notification {
  private icon: string
  private type: string
  private color: string
  private message: string

  public toTake(icon: string, type: string, color: string, message: string) {
    this.icon = icon
    this.type = type
    this.color = color
    this.message = message
  }

  public flash(route: string, session, response) {
    session.flash({
      notification: {
        icon: this.icon,
        type: this.type,
        color: this.color,
        message: this.message,
      },
    })

    return response.redirect(route)
  }
}
