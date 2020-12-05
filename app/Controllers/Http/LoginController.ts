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
        const {email, password} = request.all()
        const message = new Notification()

        const user = await User.query()
        .where('email', email)
        .first()

        if(user) {
            if(Hash.verify(user.password, password)) {
                auth.login(user)

                return response.redirect('/')
            }
        }

        message.notificationFlash('danger', 'white', 'E-mail ou senha, estão incorretos!', 'exclamation')
        message.status(session, response)
    }

    public async logout({ auth, response }) {
        await auth.logout()

        return response.redirect('/login')
    }
}
