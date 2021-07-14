import Route from '@ioc:Adonis/Core/Route'

Route.get('/signin', 'LoginController.index')
Route.post('/signin', 'LoginController.show')
