import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username', 16).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('photo', 180).notNullable()
      table.string('sex', 1)
      table.string('location', 122)
      table.string('relationship', 55)
      table.string('sexual_orientation', 24)
      table.string('color', 7)
      table.integer('permission').notNullable() // 0 ADM, 1 MOD, 2 USER
      table.string('remember_me_token').nullable()
      table.string('created_at', 55)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
