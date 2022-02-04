import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheManagerModule } from '../cache-manager/cache-manager.module';
import { CacheManagerService } from '../cache-manager/cache-manager.service';

@Module({
  imports: [ScheduleModule.forRoot(), CacheManagerModule],
  controllers: [],
  providers: [CronService, CacheManagerService],
})
export class CronModule {}
