import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cache } from 'cache-manager';

export class JwtGuard implements CanActivate {
  constructor(
    @Inject('VALIDATOR_SERVICE')
    protected readonly validatorMicroservice: ClientProxy,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split(' ')[1];
    if (!token) {
      return false;
    }
    const cacheToken = await this.cacheManager.get(token.toString());
    if (cacheToken) {
      return true;
    }
    const isValid = await this.validatorMicroservice
      .send('validate', token)
      .toPromise();
    if (isValid) {
      await this.cacheManager.set(token, 'active', {
        ttl: 300,
      });
    }
    return isValid;
  }
}
