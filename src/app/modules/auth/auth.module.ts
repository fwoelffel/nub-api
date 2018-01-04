import {Module} from '@nestjs/common';
import {AuthService} from './services/auth/auth.service';
import {AuthMiddleware} from "./middlewares/auth/auth.middleware";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  components: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    AuthMiddleware
  ]
})
export class AuthModule {}
