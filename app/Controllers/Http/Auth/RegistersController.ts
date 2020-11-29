// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegistersController {
    public index({ view }) {
        view.render('Auth/register')
    }

    public async store() {

    }
}
