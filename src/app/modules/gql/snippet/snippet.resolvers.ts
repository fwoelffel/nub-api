import {Query, Resolver} from "@nestjs/graphql";
import {SnippetService} from "../../snippet/services/snippet/snippet.service";

@Resolver('Snippet')
export class SnippetResolvers {

  constructor(private readonly snippetService: SnippetService) {}

  @Query()
  async snippets(obj, args, context, info) {
    return await this.snippetService.getAll();
  }

}