import {MiddlewaresConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AuthService} from './services/auth/auth.service';
import {JwtStrategy} from "./strategies/jwt.strategy";
import * as passport from 'passport';

@Module({
  components: [
    AuthService,
    JwtStrategy
  ]
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes({ method: RequestMethod.ALL });
  }
}
