import {Module} from '@nestjs/common';
import {UserService} from './services/user/user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {UserResolvers} from "./resolvers/user.resolvers";

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  components: [
    UserService,
    UserResolvers
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
