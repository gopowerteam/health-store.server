import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'
import { CommonEntity } from './base/common.entity'
import { UserEntity } from './user.entity'

@Entity('user-profile')
export class UserProfileEntity extends CommonEntity {
  @Column('text')
  public field

  @Column('text')
  public value

  @ManyToOne(
    type => UserEntity,
    user => user.profiles
  )
  public user: UserEntity
}
