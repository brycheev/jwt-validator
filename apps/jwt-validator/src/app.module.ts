import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CacheManagerModule } from './cache-manager/cache-manager.module';
import { CacheManagerService } from './cache-manager/cache-manager.service';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'VALIDATOR_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3010,
        },
      },
    ]),
    CacheManagerModule,
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService, CacheManagerService],
})
export class AppModule {}
