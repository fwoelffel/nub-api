import { NestFactory } from '@nestjs/core';
import {ExecutionContext, NestInterceptor, ValidationPipe} from "@nestjs/common";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import * as cors from 'cors';
import * as Raven from 'raven';
import { ApplicationModule } from './app/app.module';

const listeningPort = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const isRavenEnabled = process.env.hasOwnProperty('SENTRY_DSN');

class SentryInterceptor implements NestInterceptor {
  intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    return stream$.catch(err => {
      Raven.captureException(err);
      return Observable.throw(err);
    });
  }
};

const bootstrap = async () => {

  if (isRavenEnabled) Raven.config(process.env.SENTRY_DSN).install();
  const app = await NestFactory.create(ApplicationModule);
  if (isRavenEnabled) app.use(Raven.requestHandler());
  app.use(cors());
  app.useGlobalPipes(new ValidationPipe());
  if (isRavenEnabled) app.useGlobalInterceptors(new SentryInterceptor());
  await app.listen(listeningPort);
  console.log(`Application is listening on port ${listeningPort}`);

};

bootstrap();