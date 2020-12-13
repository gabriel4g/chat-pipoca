// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import TeamWall from 'App/Models/TeamWall'
import Notification from 'App/Helpers/NotificationHelper'

export default class RegistersController {
    public async index({ response, view, auth }) {
      const MESSAGE = await TeamWall.find(1)

      if(auth.user) return response.redirect('/')

      return view.render('Auth/register', {
        message: (MESSAGE)? MESSAGE.message:''
      })
    }

    public async store({ request, session, response }) {
        const MESSAGE = new Notification()
        const USER = new User()

        const { USERNAME, EMAIL, PASSWORD, REPEAT_PASSWORD } = request.all()

        try {
            if(PASSWORD == REPEAT_PASSWORD) {
                USER.username = USERNAME
                USER.email = EMAIL
                USER.password = PASSWORD
                USER.permission = 2
                USER.createdAt = `${new Date().toLocaleDateString()}`
            }

            const CONFIRM = await USER.save()

            if(CONFIRM) {
                MESSAGE.notificationFlash('success', '', 'Conta criada com sucesso!', 'check')
                MESSAGE.status(session, response)
            }
        }catch(err) {
           if(PASSWORD != REPEAT_PASSWORD) {
                MESSAGE.notificationFlash('warning', '', 'As senhas não batem!', 'exclamation-triangle')
                MESSAGE.status(session, response)
           } else {
                MESSAGE.notificationFlash('danger', '', 'Não foi possivel criar conta, email já existe!', 'exclamation')
                MESSAGE.status(session, response)
                console.log(err)
           }
        }
    }
}
