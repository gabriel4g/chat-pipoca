// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class ProfilesController {
    public async index({ params, response, view, auth }) {
        if(auth.user) {
            const user = await User.find(params.id)
            return view.render('Auth/profile', { 
                user: user.toJSON(),
                user_id: params.id 
            })
        } else {
            response.redirect('/login')
        }
    }
}
