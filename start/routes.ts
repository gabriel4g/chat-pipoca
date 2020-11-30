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
    Route.get('/', 'LoginController.index')
    Route.post('/', 'LoginController.check')
}).prefix('/login')

Route.group(() => {
    Route.get('/', 'RegisterController.index')
    Route.post('/', 'RegisterController.store')
}).prefix('/register')

Route.group(() => {
    Route.get('/', 'Config/ConfigController.index')
    Route.get('/upload', 'Config/ImageController.index')
    Route.put('/upload', 'Config/ImageController.store')
    Route.delete('/delete/img', 'Config/ImageController.destroy')
    Route.get('/profile', 'Auth/ProfileController.edit')
    Route.put('/profile', 'Auth/ProfileController.update')
    Route.get('/color', 'Config/NickColorController.index')
    Route.put('/color', 'Config/NickColorController.edit')
}).prefix('/config').middleware('auth')
