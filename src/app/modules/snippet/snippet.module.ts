import {Module} from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {SnippetService} from './services/snippet/snippet.service';
import {snippetRepository} from "./providers/snippet/snippet.provider";
import {SnippetController} from "./controllers/snippet/snippet.controller";
import {SnippetResolvers} from "./resolvers/snippet.resolvers";

@Module({
  imports: [
    DatabaseModule
  ],
  components: [
    snippetRepository,
    SnippetService,
    SnippetResolvers
  ],
  controllers: [
    SnippetController
  ],
  exports: [
    SnippetService
  ]
})
export class SnippetModule {}
