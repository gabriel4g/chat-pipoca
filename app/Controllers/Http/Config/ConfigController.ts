// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConfigsController {
    public async index({ response, view, auth }) {
        if(auth.user) {
            return view.render('Auth/configs/config')
        } else {
            response.redirect('/login')
        }
    }
}