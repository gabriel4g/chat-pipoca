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

Route.group(() => {
    Route.get('/', async ({ auth, response }) => {
        if(auth.user) {
            const user = await auth.authenticate()
            return `${user.email}`
        } else {
            response.redirect('/login')
        }
    })
}).prefix('/').middleware('auth')

Route.group(() => {
    Route.get('/', 'Auth/LoginController.index')
    Route.post('/', 'Auth/LoginController.check')
}).prefix('/login')

Route.group(() => {
    Route.get('/', 'Auth/RegisterController.index')
    Route.post('/', 'Auth/RegisterController.store')
}).prefix('/register')
