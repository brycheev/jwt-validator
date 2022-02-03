import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getProduct(): Record<string, any> {
    return {
      name: 'test product',
      price: 5000,
      description: 'test description',
    };
  }
}
