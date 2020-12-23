// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import TeamWall from 'App/Models/TeamWall'
import Light from 'App/Locales/style/styleLight'
import Dark from 'App/Locales/style/styleDark'
import StyleHelper from 'App/Helpers/StyleHelper'

export default class ModsController {
  public async index({ response, auth, view }) {
    const MESSAGE = await TeamWall.find(1)
    if(auth.user) {
      if(auth.user.permission == 0 || auth.user.permission == 1) {
        return view.render('Auth/configs/panel/moderator', {
          message: (MESSAGE)? MESSAGE.message:'',
          style: (StyleHelper.styleSecondary() == 'Dark')? Dark:Light,
          styleDefault: StyleHelper.style()
        })
      } else {
        response.redirect('/')
      }
    } else {
      response.redirect('/login')
    }
  }
}
