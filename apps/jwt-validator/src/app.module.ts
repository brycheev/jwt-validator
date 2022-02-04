import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CacheManagerModule } from './cache-manager/cache-manager.module';
import { CacheManagerService } from './cache-manager/cache-manager.service';

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
  ],
  controllers: [AppController],
  providers: [AppService, CacheManagerService],
})
export class AppModule {}
