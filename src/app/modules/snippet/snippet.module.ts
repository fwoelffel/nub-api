import {Module} from '@nestjs/common';
import {SnippetService} from './services/snippet/snippet.service';
import {SnippetController} from "./controllers/snippet/snippet.controller";
import {SnippetResolvers} from "./resolvers/snippet.resolvers";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Snippet} from "./entities/snippet/snippet.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Snippet])
  ],
  components: [
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
