import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Notification from 'App/Components/Notification'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class LoginController {
  private notification = new Notification()

  public async index({ view }: HttpContextContract) {
    return view.render('login', {
      title: 'chat-pipoca - Sign In',
    })
  }

  public async show({ auth, request, session, response }: HttpContextContract) {
    const { email, password, remember } = request.all()

    const user = await User.query().where('email', email).first()

    if (!user?.activated) {
      this.notification.toTake(
        'exclamation-triangle',
        'warning',
        '',
        'Check your email to activate your account!'
      )
      this.notification.flash('back', session, response)
    }
    if (user) {
      if (await Hash.verify(user.password, password)) {
        auth.login(user, remember)

        return response.redirect('/')
      }
    }

    this.notification.toTake('exclamation-triangle', 'danger', '', 'Incorrect email or password!')
    this.notification.flash('back', session, response)
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.redirect('/login')
  }
}
