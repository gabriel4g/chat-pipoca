import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TeamWall extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public message: string
}
