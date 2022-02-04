import { Module } from '@nestjs/common';
import { CacheManagerService } from './cache-manager.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CacheManagerService],
})
export class CacheManagerModule {}
