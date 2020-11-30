// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class RegistersController {
    public index({ view }) {
        return view.render('Auth/register')
    }

    public async store({ request }) {
        const user = new User();

        const { username, email, password } = request.all()

        user.username = username
        user.email = email
        user.password = password
        user.photo = '/images/profile.png'
        user.permission = 2

        await user.save()
    }
}
