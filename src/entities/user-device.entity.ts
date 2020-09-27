import { Entity } from 'typeorm'
import { CommonEntity } from './base/common.entity'

@Entity('user-device')
export class UserDeviceEntity extends CommonEntity {}
