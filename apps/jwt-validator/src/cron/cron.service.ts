import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CacheManagerService } from '../cache-manager/cache-manager.service';

@Injectable()
export class CronService {
  constructor(private readonly cacheService: CacheManagerService) {}
  @Cron('* * * * *')
  cleanCache() {
    const cache = this.cacheService.getCache();
    if (cache.size) {
      cache.forEach((value, key) => {
        if (new Date().getTime() > value) {
          this.cacheService.delete(key);
        }
      });
    }
  }
}
