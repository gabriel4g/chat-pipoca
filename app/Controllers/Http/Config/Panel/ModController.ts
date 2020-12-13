// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import TeamWall from 'App/Models/TeamWall'

export default class ModsController {
  public async index({ response, auth, view }) {
    const MESSAGE = await TeamWall.find(1)
    if(auth.user) {
      return view.render('Auth/configs/panel/moderator', {
        message: (MESSAGE)? MESSAGE.message:''
      })
    } else {
      response.redirect('/login')
    }
  }
}
