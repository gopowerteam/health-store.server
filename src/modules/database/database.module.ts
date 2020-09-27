import { Module, DynamicModule, Global } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseService } from './services/database.service'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [DatabaseService]
})
export class DatabaseModule {
  public static async forRoot(): Promise<DynamicModule> {
    const entities = await DatabaseService.getEntities()
    const providers = [DatabaseService]

    return {
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: (database: DatabaseService) => {
            return database.getConfig()
          },
          inject: [DatabaseService]
        }),
        TypeOrmModule.forFeature(entities)
      ],
      module: DatabaseModule,
      providers: [...providers],
      exports: [...providers, TypeOrmModule]
    }
  }
}
