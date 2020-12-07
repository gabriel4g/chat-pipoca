// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Notification from 'App/Helpers/NotficationHelper'

export default class RegistersController {
    public index({ response, view, auth }) {
        if(auth.user) return response.redirect('/')
        return view.render('Auth/register')
    }

    public async store({ request, session, response }) {
        const MESSAGE = new Notification()
        const USER = new User();

        const { USERNAME, EMAIL, PASSWORD, REPEAT_PASSWORD } = request.all()

        try {
            if(PASSWORD == REPEAT_PASSWORD) {
                USER.username = USERNAME
                USER.email = EMAIL
                USER.password = PASSWORD
                USER.photo = '/images/profile.png'
                USER.permission = 2
                USER.createdAt = `${new Date().toLocaleDateString()}`
            }

            const CONFIRM = await USER.save()

            if(CONFIRM) {
                MESSAGE.notificationFlash('success', 'white', 'Conta criada com sucesso!', 'check')
                MESSAGE.status(session, response)
            }
        }catch(err) {
           if(PASSWORD != REPEAT_PASSWORD) {
                MESSAGE.notificationFlash('danger', 'white', 'As senhas não batem!', 'exclamation')
                MESSAGE.status(session, response)
           } else {
                MESSAGE.notificationFlash('danger', 'white', 'Não foi possivel criar conta, usuáriou ou email já existe!', 'exclamation')
                MESSAGE.status(session, response)
                console.log(err)
           }
        }
    }
}
