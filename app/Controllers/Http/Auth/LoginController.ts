// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Session from "@ioc:Adonis/Addons/Session"

export default class LoginController {
    public index({ view }) {
        return view.render('login')
    }

    public async check({ session }) {
        session.flash({
            notification: {
                type: 'danger',
                text: 'white',
                message: 'E-mail ou senha, estão incorretos!'
            }
        })
    }
}
