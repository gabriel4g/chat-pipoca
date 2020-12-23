import TeamWall from 'App/Models/TeamWall'
import Light from 'App/Locales/style/styleLight'
import Dark from 'App/Locales/style/styleDark'
import StyleHelper from 'App/Helpers/StyleHelper'


export default class TeamWallsController {
  public async index ({ response, auth, view}) {
    const MESSAGE = await TeamWall.find(1)

    if(auth.user) {
      if(auth.user.permission == 0 || auth.user.permission == 1) {
        return view.render('Auth/configs/panel/mod/teamwall', {
          message: (MESSAGE)? MESSAGE.message:'',
          style: (StyleHelper.styleSecondary() == 'Dark')? Dark:Light,
          styleDefault: StyleHelper.style()
        })
      } else {
        return response.redirect('/')
      }
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
