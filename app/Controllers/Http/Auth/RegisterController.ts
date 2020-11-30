// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class RegistersController {
    public index({ view }) {
        return view.render('Auth/register')
    }

    public async store({ request, session, response }) {
        const user = new User();

        const { username, email, password, repeatPassword } = request.all()

        try {
            user.username = username
            user.email = email
            if(password == repeatPassword) {
                user.password = password
            } else {
                session.flash({
                    notification: {
                        type: 'danger',
                        text: 'white',
                        message: 'Não foi possivel salvar os dados!',
                        icon: 'exclamation'
                    }
                })
                return response.redirect('back')
            }
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
            return response.redirect('back')
        }
    }
}
