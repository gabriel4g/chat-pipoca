// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import Notification from 'App/Helpers/NotficationHelper'

export default class LoginController {
    public index({ view, auth, response }) {
        if(auth.user) return response.redirect('/')
        return view.render('Auth/login')
    }

    public async check({ request, session, response, auth }) {
        const { EMAIL, PASSWORD } = request.all()
        const MESSAGE = new Notification()

        const USER = await User.query()
        .where('email', EMAIL)
        .first()

        if(USER) {
            if(Hash.verify(USER.password, PASSWORD)) {
                auth.login(USER)

                return response.redirect('/')
            }
        }

        MESSAGE.notificationFlash('danger', 'white', 'E-mail ou senha, estão incorretos!', 'exclamation')
        MESSAGE.status(session, response)
    }

    public async logout({ auth, response }) {
        await auth.logout()

        return response.redirect('/login')
    }
}
