// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import DateHelper from 'App/Helpers/DateHelper'
import Notification from 'App/Helpers/NotificationHelper'
import gravatar from 'gravatar'

export default class ProfilesController {
    public async index({ params, response, view, auth }) {
        if(auth.user) {
            const USER = await User.find(params.id)
            const DATE = new DateHelper()

            if(USER) {
              DATE.Date(USER.createdAt)
                return view.render('Auth/profile', {
                    user: USER.toJSON(),
                    date: DATE.generateDate(),
                    user_id: params.id,
                    avatar: gravatar.url(USER.email, { s: '100', r: 'g', d: 'robohash' }, true)
                })
            } else return response.redirect('/')
        } else {
            response.redirect('/login')
        }
    }

    public async edit({ response, view, auth }) {
        if(auth.user) {
            return view.render('Auth/configs/profile', {
              user: auth.user
            })
        } else {
            response.redirect('/login')
        }
    }

    public async update({ session, response, request, auth}) {
        const USER = await User.find(auth.user.id)
        const MESSAGE = new Notification()

        const { SEX, LOCATION, RELATIONSHIP, SEXUAL_ORIENTATION } = request.all()

        try {
          if(USER) {
            USER.sex = SEX
            USER.location = LOCATION
            USER.relationship = RELATIONSHIP
            USER.sexual_orientation = SEXUAL_ORIENTATION

            await USER.save()

            MESSAGE.notificationFlash('success', 'white', 'Dados atualizados!', 'check')
            MESSAGE.status(session, response)


        } else {
          return 'Conta apagada ou não existe!'
        }

        } catch(err) {
          MESSAGE.notificationFlash('danger', 'white', 'Erro ao salvar os dados!', 'exclamation')
          MESSAGE.status(session, response)
          console.log(err)
        }
    }

    public async destroy() {

    }
}
