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
            user.username = username
            user.email = email
            if(password == repeatPassword) {
                user.password = password
            } else {
                
                message.notificationFlash('danger', 'white', 'As senhas não batem!', 'exclamation')
                message.status(session, response)
            }
            user.photo = '/images/profile.png'
            user.permission = 2

            const confirm = await user.save()

            if(confirm) {
                message.notificationFlash('success', 'white', 'Conta criada com sucesso!', 'check')
                message.status(session, response)
            }
        }catch(err) {
            message.notificationFlash('danger', 'white', 'Não foi possivel salvar os dados!', 'exclamation')
            message.status(session, response)
        }
    }
}
