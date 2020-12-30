// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import TeamWall from 'App/Models/TeamWall'
import Notification from 'App/Helpers/NotificationHelper'
import Light from 'App/Locales/style/styleLight'
import Dark from 'App/Locales/style/styleDark'
import StyleHelper from 'App/Helpers/StyleHelper'
import gravatar from 'gravatar'

export default class NickColorsController {
  public async index({ response, view, auth }) {
    const MESSAGE = await TeamWall.find(1)
    if (auth.user) {
      return view.render('Auth/configs/color', {
        message: (MESSAGE) ? MESSAGE.message : '',
        style: (StyleHelper.styleSecondary() == 'Dark') ? Dark : Light,
        styleDefault: StyleHelper.style(),
        avatar: gravatar
      })
    } else {
      response.redirect('/login')
    }
  }

  public async update({ request, response, session, auth }) {
    const MESSAGE = new Notification()
    const USER = await User.find(auth.user.id)

    try {
      if (USER) {
        USER.color = request.input('color')

        MESSAGE.notificationFlash('success', 'white', 'Cor alterada com sucesso!', 'check')
        MESSAGE.status(session, response)
        await USER.save()

        response.redirect('back')
      }
    } catch (err) {
      MESSAGE.notificationFlash('danger', 'white', 'Algum erro aconteceu ao salvar!', 'exclamation')
      MESSAGE.status(session, response)

      console.log(err)

      response.redirect('back')
    }
  }
}
