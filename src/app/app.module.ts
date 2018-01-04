import {MiddlewaresConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {DatabaseModule} from "./modules/database/database.module";
import {SnippetModule} from "./modules/snippet/snippet.module";
import {GQLModule} from "./modules/gql/gql.module";
import {UserModule} from "./modules/user/user.module";
import {AuthModule} from "./modules/auth/auth.module";
import {AuthMiddleware} from "./modules/auth/middlewares/auth/auth.middleware";

@Module({
  imports: [
    DatabaseModule,
    SnippetModule,
    GQLModule,
    UserModule,
    AuthModule
  ]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}