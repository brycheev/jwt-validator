import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ValidatorModule } from './validator.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ValidatorModule, {
    transport: Transport.TCP,
    options: {
      port: 3010,
      retryAttempts: 10,
      retryDelay: 1000,
    },
  });
  app.listen();
}
bootstrap();
