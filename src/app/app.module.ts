import {Module} from '@nestjs/common';
import {DatabaseModule} from "./modules/database/database.module";
import {SnippetModule} from "./modules/snippet/snippet.module";

@Module({
  modules: [
    DatabaseModule,
    SnippetModule
  ]
})
export class ApplicationModule {}