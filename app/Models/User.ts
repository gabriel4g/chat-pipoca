import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public photo: string

  @column()
  public sex: string

  @column()
  public location: string

  @column()
  public relationship: string

  @column()
  public sexual_orientation: string

  @column()
  public color: string

  @column()
  public permission: number

  @column()
  public rememberMeToken?: string

  @column()
  public createdAt: string


  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
