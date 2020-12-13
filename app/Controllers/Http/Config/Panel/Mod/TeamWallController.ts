import TeamWall from 'App/Models/TeamWall'

export default class TeamWallsController {
  public async index ({ response, auth, view}) {
    const MESSAGE = await TeamWall.find(1)

    if(auth.user) {
      return view.render('Auth/configs/panel/mod/teamwall', {
        message: (MESSAGE)? MESSAGE.message:'',
      })
    } else {
      response.redirect('/login')
    }
  }

  public async store ({ response, request }) {
    const MESSAGE_ID = await TeamWall.find(1)
    const { MESSAGE } = request.all()
    if(MESSAGE_ID) {

      MESSAGE_ID.message = MESSAGE

      await MESSAGE_ID.save()
    } else {
      const MESSAGE_TEAM = new TeamWall()

      MESSAGE_TEAM.message = MESSAGE

      await MESSAGE_TEAM.save()
    }
    return response.redirect('back')
  }
}
