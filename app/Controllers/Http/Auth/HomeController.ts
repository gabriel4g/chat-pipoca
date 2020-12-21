// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import TeamWall from 'App/Models/TeamWall'
import Chat from 'App/Models/Chat'
import gravatar from 'gravatar'


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
                  USER,
                  message: (MESSAGE)? MESSAGE.message:'',
                  chats: CHAT,
                  avatar: gravatar,
                  qparams: PAGE
                })
        } else {
                response.redirect('/login')
        }
    }

}
