// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import TeamWall from 'App/Models/TeamWall'

export default class HomeController {
    public async index({ auth, response, view }) {
      const MESSAGE = await TeamWall.find(1)
        if(auth.user) {
                const USER = await auth.authenticate()
                return view.render('Auth/home', {
                  USER,
                  message: (MESSAGE)? MESSAGE.message:''
                })
        } else {
                response.redirect('/login')
        }
    }

}
