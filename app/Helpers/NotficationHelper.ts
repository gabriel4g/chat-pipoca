export default class NotificationHelper {
    type: string
    text: string
    message: string
    icon: string

    typeFlash(type: string) {
        this.type = type
    }

    textFlash(text: string) {
        this.text = text
    }

    messageFlash(message: string) {
        this.message = message
    }

    iconFlash(icon: string) {
        this.icon = icon
    }

    notificationFlash(type, text, message, icon) {
        this.type = type
        this.text = text
        this.message = message
        this.icon = icon
    }

    public status(session, response) {
        session.flash({
            notification: {
                type: this.type,
                text: this.text,
                message: this.message,
                icon: this.icon
            }
        })
        return response.redirect('back')
    }
}
