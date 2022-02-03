import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidatorService {
  validate(token) {
    if (typeof token === 'string') {
      return true;
    }
  }
}
