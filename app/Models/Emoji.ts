import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Emoji extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string
  @column()
  public emoji: string
}
