// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
    public index({ view }) {
        return view.render('Auth/login')
    }

    public async check({ session, response }) {
        session.flash({
            notification: {
                type: 'danger',
                text: 'white',
                message: 'E-mail ou senha, estão incorretos!'
            }
        })
        return response.redirect('back')
    }
}
