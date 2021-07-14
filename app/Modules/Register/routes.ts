import Route from '@ioc:Adonis/Core/Route'

Route.get('/join', 'RegisterController.index')
Route.post('/join', 'RegisterController.store')
