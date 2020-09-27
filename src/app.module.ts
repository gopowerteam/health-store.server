import { Module } from '@nestjs/common'
import { BannerController } from '~/controllers/banner.controller'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '~/modules/database/database.module'
import { BannerService } from './services/banner.service'
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true
    }),
    DatabaseModule.forRoot()
  ],
  controllers: [BannerController],
  providers: [BannerService]
})
export class AppModule {}
