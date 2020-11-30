/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'Auth/HomeController.index').middleware('auth')
Route.get('/logout', 'Auth/LoginController.logout').middleware('auth')
Route.get('/u/:id', 'Auth/ProfileController.index').middleware('auth')


Route.group(() => {
    Route.get('/', 'Auth/LoginController.index')
    Route.post('/', 'Auth/LoginController.check')
}).prefix('/login')

Route.group(() => {
    Route.get('/', 'Auth/RegisterController.index')
    Route.post('/', 'Auth/RegisterController.store')
}).prefix('/register')

Route.group(() => {
    Route.get('/', 'Auth/ConfigController.index')
    Route.get('color', 'Auth/ConfigController.updateColor')
}).prefix('/config').middleware('auth')
