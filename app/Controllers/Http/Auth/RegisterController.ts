// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Notifcation from 'App/Helpers/NotficationHelper'

export default class RegistersController {
    public index({ view }) {
        return view.render('Auth/register')
    }

    public async store({ request, session, response }) {
        let message = new Notifcation()
        const user = new User();

        const { username, email, password, repeatPassword } = request.all()

        try {
            if(password == repeatPassword) {
                user.username = username
                user.email = email
                user.password = password
                user.photo = '/images/profile.png'
                user.permission = 2
            }

            const confirm = await user.save()

            if(confirm) {
                message.notificationFlash('success', 'white', 'Conta criada com sucesso!', 'check')
                message.status(session, response)
            }
        }catch(err) {
           if(password != repeatPassword) {
                message.notificationFlash('danger', 'white', 'As senhas não batem!', 'exclamation')
                message.status(session, response)
           } else {
                message.notificationFlash('danger', 'white', 'Não foi possivel criar conta, usuáriou ou email já existe!', 'exclamation')
                message.status(session, response)
           }
        }
    }
}
