import {Query, Resolver} from "@nestjs/graphql";
import {SnippetService} from "../../snippet/services/snippet/snippet.service";
import {classToPlain} from "class-transformer";

@Resolver('Snippet')
export class SnippetResolvers {

  constructor(private readonly snippetService: SnippetService) {}

  @Query()
  async snippets(obj, args, context, info) {
    const snippetEntities = await this.snippetService.getAll();
    const plainSnippets = classToPlain(snippetEntities);
    return plainSnippets;
  }

}