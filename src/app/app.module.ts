import {Module} from '@nestjs/common';
import {DatabaseModule} from "./modules/database/database.module";
import {SnippetModule} from "./modules/snippet/snippet.module";
import {GQLModule} from "./modules/gql/gql.module";
import {UserModule} from "./modules/user/user.module";

@Module({
  imports: [
    DatabaseModule,
    SnippetModule,
    GQLModule,
    UserModule
  ]
})
export class ApplicationModule {}