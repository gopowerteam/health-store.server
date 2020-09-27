import { Entity, Column, OneToMany } from 'typeorm'
import { CommonEntity } from './base/common.entity'
import { UserPasswordEntity } from './user-password.entity'
import { UserProfileEntity } from './user-profile.entity'
import { Exclude } from 'class-transformer'

@Entity('user')
export class UserEntity extends CommonEntity {
  @Column('text')
  public username

  @Exclude()
  @OneToMany(
    type => UserPasswordEntity,
    password => password.user
  )
  public password: UserPasswordEntity[]

  @OneToMany(
    type => UserProfileEntity,
    profile => profile.user
  )
  public profiles: UserProfileEntity[]
}
