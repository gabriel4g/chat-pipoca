import test from 'japa'
import User from 'App/Models/User'

test.group('Database', () => {
  const name = 'Gabriel Oliveira'
  const email = 'gabr.lucena@hotmail.com'
  const password = '77539783'
  test('create user', async(assert) => {
    const user = new User()

    user.name = name
    user.email = email
    user.password = password
    user.activated = false

    assert.exists(await user.save())
  })

  test('search user', async(assert) => {
    const user = await User.query()
      .where('email', email)
      .first()

    assert.exists(user?.email)
    assert.notEqual(user?.password, password)
  })
})
