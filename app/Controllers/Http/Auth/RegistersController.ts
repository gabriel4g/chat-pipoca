// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegistersController {
    public index({ view }) {
        view.render('register')
    }

    public async store() {
        
    }
}
