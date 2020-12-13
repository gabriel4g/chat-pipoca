// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import TeamWall from 'App/Models/TeamWall'

export default class ConfigsController {
    public async index({ response, view, auth }) {
      const MESSAGE = await TeamWall.find(1)
        if(auth.user) {
            return view.render('Auth/configs/config', {
              user: auth.user,
              message: (MESSAGE)? MESSAGE.message:''
            })
        } else {
            response.redirect('/login')
        }
    }
}
