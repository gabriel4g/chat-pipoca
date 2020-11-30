// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
    public async index({ auth, response, view }) {
        if(auth.user) {
                const user = await auth.authenticate()
                return view.render('Auth/home', { user })
        } else {
                response.redirect('/login')
        }
    }

}
