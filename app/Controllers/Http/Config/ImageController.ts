// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User"
import Application from '@ioc:Adonis/Core/Application'

export default class ImagesController {
  public async index({ response, view, auth }) {
    if(auth.user) {
            return view.render('Auth/configs/photo')
        } else {
            response.redirect('/login')
        }
  }

  public async update({ request, session, response, auth}) {
    const avatar = request.file('avatar')
    const user = await User.find(auth.user.id)
    const filename = `${new Date().getTime()}.${avatar.extname}`

    if(!avatar) {
      return response.send('selecione o avatar')
    } else {
      if(user) {
        user.photo = filename
        user.save()
      }
      await avatar.move(Application.publicPath('uploads'), {
        name: filename
      })
      return response.send('Avatar atualizado!')
    }

  }
}
