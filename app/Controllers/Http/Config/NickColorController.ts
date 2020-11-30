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

    public async edit({request, response, session, auth}) {
        const user = await User.find(auth.user.id)
        const message = new Notification()
        if(user) {
            user.color = request.input('color')

            message.notificationFlash('danger', 'white', 'Cor alterada com sucesso!', 'check')
            message.status(session, response)
            await user.save()
            response.redirect('back')
        }
    }
}
