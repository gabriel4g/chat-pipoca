import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TeamWalls extends BaseSchema {
  protected tableName = 'team_walls'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('message', 500).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
