// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import TeamWall from 'App/Models/TeamWall'
import Light from 'App/Locales/style/styleLight'
import Dark from 'App/Locales/style/styleDark'
import StyleHelper from 'App/Helpers/StyleHelper'
import gravatar from 'gravatar'

export default class BbcodesController {
  public async index({ response, view, auth }) {
    const MESSAGE = await TeamWall.find(1)
      if(auth.user) {
        return view.render('Auth/configs/bbcodes', {
          user: auth.user,
          message: (MESSAGE)? MESSAGE.message:'',
          style: (StyleHelper.styleSecondary() == 'Dark')? Dark:Light,
          styleDefault: StyleHelper.style(),
          avatar: gravatar
        })
      } else {
        response.redirect('/login')
      }
  }

}
