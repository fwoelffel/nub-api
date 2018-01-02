import {Module} from '@nestjs/common';
import {UserService} from './services/user/user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  components: [
    UserService
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
