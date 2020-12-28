// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import TeamWall from 'App/Models/TeamWall'
import Hash from '@ioc:Adonis/Core/Hash'
import Notification from 'App/Helpers/NotificationHelper'
import Light from 'App/Locales/style/styleLight'
import Dark from 'App/Locales/style/styleDark'
import StyleHelper from 'App/Helpers/StyleHelper'


export default class LoginController {
    public async index({ view, auth, response }) {
      const MESSAGE = await TeamWall.find(1)
        if(auth.user) return response.redirect('/')
        return view.render('Auth/login', {
          message: (MESSAGE)? MESSAGE.message:'',
          style: (StyleHelper.styleSecondary() == 'Dark')? Dark:Light,
          styleDefault: StyleHelper.style()
        })
    }

    public async check({ request, session, response, auth }) {
        const { EMAIL, PASSWORD } = request.all()
        const MESSAGE = new Notification()

        const USER = await User.query()
        .where('email', EMAIL)
        .first()

        if(USER) {
            if(await Hash.verify(USER.password, PASSWORD)) {
                auth.login(USER)

                return response.redirect('/')
            }
        }

        MESSAGE.notificationFlash('warning', '', 'E-mail ou senha, estão incorretos!', 'exclamation-triangle')
        MESSAGE.status(session, response)
    }

    public async logout({ auth, response }) {
        await auth.logout()

        return response.redirect('/login')
    }
}
