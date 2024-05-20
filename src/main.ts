import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import 'reflect-metadata';
import AppDataSource from './data-source';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized');
    })
    .catch((err) => {
      console.log('Error Initializing Data Source', err);
    });

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription(
      'Exposes CRUD endpoints to manage tasks. Authentication via JWT required and socket implemented to stream updates',
    )
    .setVersion('1.0')
    .addTag('tasks')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT_NUM');
  await app.listen(port);
}
bootstrap();
