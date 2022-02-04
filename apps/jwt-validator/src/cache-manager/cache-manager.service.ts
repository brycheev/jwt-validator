import { Injectable } from '@nestjs/common';
import { cache } from './cache';
@Injectable()
export class CacheManagerService {
  private cache = cache;
  set(key: string, value: any) {
    this.cache.set(key, value);
    // setTimeout(() => this.cache.delete(key), 300000);
  }

  get(key: string) {
    return this.cache.get(key);
  }

  delete(key: string) {
    this.cache.delete(key);
  }

  reset() {
    this.cache.clear();
  }

  getCache() {
    return this.cache;
  }
}
