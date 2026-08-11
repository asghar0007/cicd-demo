import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('pitch')
  async generatePitch(@Body('keyword') keyword: string) {
    const pitch = await this.appService.generateStartupPitch(keyword);
    return { pitch };
  }
}
