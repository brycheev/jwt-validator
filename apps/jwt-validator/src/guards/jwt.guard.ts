import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CacheManagerService } from '../cache-manager/cache-manager.service';

export class JwtGuard implements CanActivate {
  constructor(
    @Inject('VALIDATOR_SERVICE')
    protected readonly validatorMicroservice: ClientProxy,
    private readonly cacheService: CacheManagerService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split(' ')[1];
    if (!token) {
      return false;
    }
    const cacheToken = this.cacheService.get(token.toString());
    if (cacheToken) {
      return true;
    }
    const isValid = await this.validatorMicroservice
      .send('validate', token)
      .toPromise();
    if (isValid) {
      const expiredIn = new Date().getTime() + 5 * 60000;
      await this.cacheService.set(token.toString(), expiredIn);
    }
    return isValid;
  }
}
