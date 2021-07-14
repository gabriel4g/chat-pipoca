import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Notification from 'App/Components/Notification'

export default class RegisterController {
  private notification = new Notification()
  private user = new User()

  public async index({ view }: HttpContextContract) {
    return view.render('register', {
      title: 'chat-pipoca - Create new account',
    })
  }

  public async store({ session, request, response }: HttpContextContract) {
    const { fullname, email, password } = request.all()

    try {
      this.user.name = fullname
      this.user.email = email
      this.user.password = password
      this.user.activated = false

      if (await this.user.save()) {
        this.notification.toTake('check', 'success', '', 'Check email to activate account!')
        this.notification.flash('back', session, response)
      }
    } catch (err) {
      this.notification.toTake(
        'exclamation-triangle',
        'danger',
        '',
        'Unable to create account, email already exists!'
      )
      this.notification.flash('back', session, response)
      console.log(err)
    }
  }
}
