// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Notification from 'App/Helpers/NotficationHelper'

export default class LoginController {
    public index({ view }) {
        return view.render('Auth/login')
    }

    public async check({ session, response }) {

        const message = new Notification()

        message.notificationFlash('danger', 'white', 'E-mail ou senha, estão incorretos!', 'exclamation')
        message.status(session, response)
    }
}
