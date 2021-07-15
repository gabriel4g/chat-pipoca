import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Logged {
  public async handle ({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if(await auth.check()) {
      response.redirect('/')
    }
    await next()
  }
}
