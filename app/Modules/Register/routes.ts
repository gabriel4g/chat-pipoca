import Route from '@ioc:Adonis/Core/Route'

Route.get('/join', 'RegisterController.index').middleware('logged')
Route.post('/join', 'RegisterController.store')
