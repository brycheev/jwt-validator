import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheManagerService {
  private cache = new Map();
  set(key: string, value: any) {
    this.cache.set(key, value);
    setTimeout(() => this.cache.delete(key), 300000);
  }

  get(key: string) {
    return this.cache.get(key);
  }

  reset() {
    this.cache.clear();
  }
}
