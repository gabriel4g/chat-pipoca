import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Chats extends BaseSchema {
  protected tableName = 'chats'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      table.string('messages', 160).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
