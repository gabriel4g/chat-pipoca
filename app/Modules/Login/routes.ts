import Route from '@ioc:Adonis/Core/Route'

Route.get('/signin', 'LoginController.index').middleware('logged')
Route.post('/signin', 'LoginController.show')

Route.get('/logout', 'LoginController.logout')
