// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Notification from 'App/Helpers/NotficationHelper'

export default class NickColorsController {
    public async index({ response, view, auth }) {
        if(auth.user) {
            return view.render('Auth/configs/color')
        } else {
            response.redirect('/login')
        }
    }

    public async update({request, response, session, auth}) {
        const message = new Notification()
        const user = await User.find(auth.user.id)

        try {
            if(user) {
                user.color = request.input('color')

                message.notificationFlash('success', 'white', 'Cor alterada com sucesso!', 'check')
                message.status(session, response)
                await user.save()

                response.redirect('back')
            }
        } catch(err) {
            message.notificationFlash('danger', 'white', 'Algum erro aconteceu ao salvar!', 'exclamation')
            message.status(session, response)
            
            console.log(err)

            response.redirect('back')
        }
    }
}
