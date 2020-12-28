import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Emojis extends BaseSchema {
  protected tableName = 'emojis'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code', 20).notNullable().unique()
      table.string('emoji', 20).notNullable().unique()

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
