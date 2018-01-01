import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app/app.module';
import { ValidationPipe } from "@nestjs/common";

const listeningPort = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const bootstrap = async () => {

  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(listeningPort);
  console.log(`Application is listening on port ${listeningPort}`);

};

bootstrap();