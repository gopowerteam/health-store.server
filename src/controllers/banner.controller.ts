import { Controller, Get } from '@nestjs/common'
import { BannerService } from '~/services/banner.service'

@Controller()
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}
}
