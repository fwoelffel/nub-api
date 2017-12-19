import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app/app.module';
import { ValidationPipe } from "@nestjs/common";

const bootstrap = async () => {

  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log('Application is listening on port 3000')

};

bootstrap();