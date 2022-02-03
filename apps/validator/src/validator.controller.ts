import { Controller, Get } from '@nestjs/common';
import { ValidatorService } from './validator.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ValidatorController {
  constructor(private readonly validatorService: ValidatorService) {}

  @MessagePattern('validate')
  async onValidate(token) {
    return this.validatorService.validate(token);
  }

  @Get()
  async getHello() {
    return 'Hello World!';
  }
}
