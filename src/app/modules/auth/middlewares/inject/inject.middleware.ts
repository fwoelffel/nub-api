import {Middleware, NestMiddleware} from '@nestjs/common';

@Middleware()
export class InjectMiddleware implements NestMiddleware {
  resolve(): (req, res, next) => void {
    return (req, res, next) => {
      next();
    }
  }
}
