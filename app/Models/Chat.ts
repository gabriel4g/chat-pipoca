import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

 @column()
 public user_id: number

 @column()
 public messages: string

 @column()
 public createdAt: string

 @column()
  public userId: number

  @belongsTo(() => User, {

  })
  public user: BelongsTo<typeof User>
}
