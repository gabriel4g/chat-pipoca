// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import DateHelper from 'App/Helpers/DateHelper'
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

    public async edit() {

    }

    public async update() {

    }

    public async destroy() {

    }
}
