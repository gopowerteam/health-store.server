import { Entity, Column, ManyToOne } from 'typeorm'
import { CommonEntity } from './base/common.entity'
import { UserEntity } from './user.entity'

@Entity('user-passowrd')
export class UserPasswordEntity extends CommonEntity {
  // 用户ID
  @ManyToOne(
    type => UserEntity,
    user => user.password
  )
  public user: UserEntity

  // 密码字符
  @Column('text')
  public password

  // 密码是否有效
  @Column('boolean', { default: true })
  public valid
}
