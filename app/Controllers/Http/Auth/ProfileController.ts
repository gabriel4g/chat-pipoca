// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import DateHelper from 'App/Helpers/DateHelper'

export default class ProfilesController {
    public async index({ params, response, view, auth }) {
        if(auth.user) {
            const user = await User.find(params.id)
            const date = new DateHelper()

            if(user) {
              date.Date(user.createdAt)
                return view.render('Auth/profile', {
                    user: user.toJSON(),
                    date: date.generateDate(),
                    user_id: params.id
                })
            } else return response.redirect('/')
        } else {
            response.redirect('/login')
        }
    }

    public async edit() {

    }

    public async update() {

    }

    public async destroy() {

    }
}
