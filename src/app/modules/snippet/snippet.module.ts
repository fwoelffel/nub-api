import {Module} from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {SnippetService} from './services/snippet/snippet.service';
import {snippetRepository} from "./snippet.provider";
import {SnippetController} from "./controllers/snippet/snippet.controller";

@Module({
  modules: [
    DatabaseModule
  ],
  components: [
    snippetRepository,
    SnippetService
  ],
  controllers: [
    SnippetController
  ],
  exports: [
    SnippetService
  ]
})
export class SnippetModule {}
