import { Injectable } from '@nestjs/common'

@Injectable()
export class BannerService {
  getHello(): string {
    return 'Hello World!'
  }
}
