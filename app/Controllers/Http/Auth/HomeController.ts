// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import TeamWall from 'App/Models/TeamWall'
import Notification from 'App/Helpers/NotificationHelper'
import Chat from 'App/Models/Chat'
import gravatar from 'gravatar'
import StyleHelper from 'App/Helpers/StyleHelper'
import Dark from 'App/Locales/style/styleDark'
import Light from 'App/Locales/style/styleLight'


export default class HomeController {
    public async index({ auth, response, request, view }) {
      const PAGE = request.input('page', 1)
      const LIMIT = 6
      const CHAT = await Chat.query()
        .select()
        .from('chats')
        .orderBy('id', 'desc')
        .preload('user')
        .paginate(PAGE, LIMIT)
        CHAT.baseUrl('/')

      const MESSAGE = await TeamWall.find(1)
        if(auth.user) {
          const USER = await auth.authenticate()

          return view.render('Auth/home', {
            user: USER,
            message: (MESSAGE)? MESSAGE.message:'',
            chats: CHAT,
            avatar: gravatar,
            queryParams: PAGE,
            style: (StyleHelper.styleSecondary() == 'Dark')? Dark:Light,
            styleDefault: StyleHelper.style()
          })
        } else {
                response.redirect('/login')
        }
    }

    public async chat({ request, auth, session, response }) {
      const NEW_MESSAGE = new Chat()
      const MESSAGE = request.input('message')
      const MESSAGE_PUSH = new Notification()

     try {
      NEW_MESSAGE.messages = MESSAGE
      NEW_MESSAGE.userId = auth.user.id
      NEW_MESSAGE.createdAt = `${new Date()}`

      await NEW_MESSAGE.save()

      response.redirect('back')

    }  catch(err) {

      MESSAGE_PUSH.notificationFlash('danger', '', 'Erro ao enviar mensagem!', 'exclamation')
      MESSAGE_PUSH.status(session, response)

      console.log(err)
     }

  }

  public async chatEdit({ params, view }) {
    const MESSAGE_ID = params.id
    const CHAT = await Chat.find(MESSAGE_ID)

    return view.render('Auth/home', {
      editMessage: (CHAT)? CHAT.messages:'',
      id: MESSAGE_ID,
      style: (StyleHelper.styleSecondary() == 'Dark')? Dark:Light,
      styleDefault: StyleHelper.style()
    })

  }

  public async chatUpdate({ params, request, session, response }) {
    const MESSAGE_ID = params.id
    const NEW_MESSAGE = request.input('message')
    const CHAT = await Chat.find(MESSAGE_ID)
    const MESSAGE_PUSH = new Notification()

    try {
      if(CHAT) {
        CHAT.messages = NEW_MESSAGE
        CHAT.createdAt = `${new Date()}`

        await CHAT.save()

        MESSAGE_PUSH.notificationFlash('success', '', 'Mensagem Editada!', 'check')
        MESSAGE_PUSH.statusHome(session, response)
      }
    } catch(err) {
        MESSAGE_PUSH.notificationFlash('danger', '', 'Erro ao enviar mensagem!', 'exclamation')
        MESSAGE_PUSH.statusHome(session, response)

        console.log(err)
    }
  }

  public async chatDelete({ params, session, response }) {
    const MESSAGE_ID = params.id
    const CHAT = await Chat.find(MESSAGE_ID)
    const MESSAGE_PUSH = new Notification()

    try {
      if(CHAT) {
        CHAT.delete()

        MESSAGE_PUSH.notificationFlash('success', '', 'Mensagem deletada!', 'check')
        MESSAGE_PUSH.status(session, response)
      }
    } catch(err) {
      MESSAGE_PUSH.notificationFlash('danger', '', 'Erro ao deletar mensagem!', 'exclamation')
      MESSAGE_PUSH.status(session, response)

      console.log(err)
    }
  }
}
