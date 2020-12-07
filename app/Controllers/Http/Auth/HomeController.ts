// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
    public async index({ auth, response, view }) {
        if(auth.user) {
                const USER = await auth.authenticate()
                return view.render('Auth/home', { USER })
        } else {
                response.redirect('/login')
        }
    }

}
