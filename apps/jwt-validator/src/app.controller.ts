import { Controller, Get, UseGuards, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './guards/jwt.guard';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('product')
  @UseGuards(JwtGuard)
  getProduct(): Record<string, any> {
    return this.appService.getProduct();
  }

  @Get()
  async getHello() {
    return 'Hello World!';
  }
}
