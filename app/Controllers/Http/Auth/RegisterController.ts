// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import sessionConfig from 'Config/session';

export default class RegistersController {
    public index({ view }) {
        return view.render('Auth/register')
    }

    public async store({ request, session }) {
        const user = new User();

        const { username, email, password, response } = request.all()

        try {
            user.username = username
            user.email = email
            user.password = password
            user.photo = '/images/profile.png'
            user.permission = 2

            const confirm = await user.save()

            if(confirm) {
                session.flash({
                    notification: {
                        type: 'success',
                        text: 'white',
                        message: 'Conta criada com sucesso',
                        icon: 'check'
                    }
                })
                return response.redirect('back')
            }
        }catch(err) {
            session.flash({
                notification: {
                    type: 'danger',
                    text: 'white',
                    message: 'Não foi possivel salvar os dados!',
                    icon: 'exclamation'
                }
            })
            return response.redirext('back')
        }
    }
}
