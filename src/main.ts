import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import 'reflect-metadata';
import AppDataSource from './data-source';

async function bootstrap() {
  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized');
    })
    .catch((err) => {
      console.log('Error Initializing Data Source', err);
    });

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT_NUM');
  await app.listen(port);
}
bootstrap();
