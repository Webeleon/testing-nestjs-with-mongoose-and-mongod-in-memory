import { Controller, Get, Res, Response, Logger } from '@nestjs/common';
import { SquidService } from './squid.service';

@Controller('squid')
export class SquidController {
  constructor(
    private readonly squidService: SquidService,
  ) {}

  @Get()
  async getSquid(

  ) {
      const squid = await this.squidService.getSquid();
      return `<img src="${squid.url}" />`;
  }
}
