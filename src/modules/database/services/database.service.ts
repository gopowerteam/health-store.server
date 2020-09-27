import { get } from 'lodash'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import { readdirSync } from 'fs'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DatabaseService {
  private entities = []

  constructor(private configService: ConfigService) {
    DatabaseService.getEntities().then(entities => (this.entities = entities))
  }

  public static async getEntities(
    entityPath = join(__dirname, '..', '..', '..', 'entities')
  ): Promise<any[]> {
    if (!entityPath) {
      return
    }

    const entities = await Promise.all(
      readdirSync(entityPath)
        .filter(path => /^.*?\.entity\.(ts|js)$/.test(path))
        .map(async path => import(join(entityPath, path)))
    )
      .then(entities => entities.map(entity => Object.values(entity)))
      .then(entities => entities.flat())

    return entities
  }

  /**
   * 获取数据库配置
   */
  async getConfig(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.configService.get('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get('DATABASE_USERNAME'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE_DATABASE'),
      entities: this.entities,
      synchronize: true
    }
  }
}
