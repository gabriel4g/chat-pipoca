// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import TeamWall from 'App/Models/TeamWall'
import DateHelper from 'App/Helpers/DateHelper'
import Notification from 'App/Helpers/NotificationHelper'
import Light from 'App/Locales/style/styleLight'
import Dark from 'App/Locales/style/styleDark'
import StyleHelper from 'App/Helpers/StyleHelper'
import gravatar from 'gravatar'


export default class ProfilesController {
  public async index({ params, response, view, auth }) {
    const MESSAGE = await TeamWall.find(1)
    if (auth.user) {
      const USER = await User.find(params.id)
      const DATE = new DateHelper()

      if (USER) {
        DATE.Date(USER.createdAt)
        return view.render('Auth/profile', {
          user: USER.toJSON(),
          message: (MESSAGE) ? MESSAGE.message : '',
          user_id: params.id,
          createdAt: DATE.generateDate(),
          style: (StyleHelper.styleSecondary() == 'Dark') ? Dark : Light,
          styleDefault: StyleHelper.style(),
          avatar: gravatar
        })
      } else return response.redirect('/')
    } else {
      response.redirect('/login')
    }
  }

  public async edit({ response, view, auth }) {
    if (auth.user) {
      const MESSAGE = await TeamWall.find(1)
      return view.render('Auth/configs/profile', {
        user: auth.user,
        message: (MESSAGE) ? MESSAGE.message : '',
        style: (StyleHelper.styleSecondary() == 'Dark') ? Dark : Light,
        styleDefault: StyleHelper.style(),
        avatar: gravatar
      })
    } else {
      response.redirect('/login')
    }
  }

  public async update({ session, response, request, auth }) {
    const USER = await User.find(auth.user.id)
    const MESSAGE = new Notification()

    const { SEX, LOCATION, STATUS, RELATIONSHIP, SEXUAL_ORIENTATION } = request.all()

    try {
      if (USER) {
        USER.sex = SEX
        USER.location = LOCATION
        USER.status = STATUS
        USER.relationship = RELATIONSHIP
        USER.sexual_orientation = SEXUAL_ORIENTATION

        await USER.save()

        MESSAGE.notificationFlash('success', 'white', 'Dados atualizados!', 'check')
        MESSAGE.status(session, response)


      } else {
        return 'Conta apagada ou não existe!'
      }

    } catch (err) {
      MESSAGE.notificationFlash('danger', 'white', 'Erro ao salvar os dados!', 'exclamation')
      MESSAGE.status(session, response)
      console.log(err)
    }
  }

  public async destroy({ response, session, auth }) {
    const USER = await User.find(auth.user.id);
    const MESSAGE = new Notification()

    try {
      if (USER) {
        USER.delete()
        await auth.logout();
        MESSAGE.notificationFlash('success', '', 'Conta deletada!', 'check')
        MESSAGE.statusLogin(session, response)

      }
    } catch (err) {
      MESSAGE.notificationFlash('danger', 'white', 'Erro ao salvar os dados!', 'exclamation')
      MESSAGE.statusLogin(session, response)
    }
  }
}
