import {Mutation, Query, Resolver} from "@nestjs/graphql";
import {SnippetService} from "../../snippet/services/snippet/snippet.service";
import {classToPlain} from "class-transformer";
import {SnippetInterface} from "../../snippet/entities/snippet/snippet.entity";
import {IncomingMessage} from "http";

@Resolver('Snippet')
export class SnippetResolvers {

  constructor(private readonly snippetService: SnippetService) {}

  @Query()
  async getSnippets(obj, args, context, info) {
    const snippetEntities = await this.snippetService.getAll();
    const plainSnippets = classToPlain(snippetEntities);
    return plainSnippets;
  }

  @Query()
  async getLastSnippets(obj, args, context, info) {
    const snippetEntities = await this.snippetService.getLastSnippets(args.count);
    const plainSnippets = classToPlain(snippetEntities);
    return plainSnippets;
  }

  @Query()
  async getSnippetById(obj, args, context, info) {
    const snippetEntity = await this.snippetService.getByShortId(args.id);
    const plainSnippet = classToPlain(snippetEntity);
    return plainSnippet;
  }

  @Mutation()
  async createSnippet(msg: IncomingMessage, args: {}) {
    const createdEntity = await this.snippetService.create(args);
    const savedEntity = await this.snippetService.save(createdEntity);
    const plainSnippet = classToPlain(savedEntity);
    return plainSnippet;
  }

  @Mutation()
  async updateSnippet(msg: IncomingMessage, args) {
    const updatePayload: SnippetInterface = {};
    if (args.name) updatePayload.name = args.name;
    if (args.description) updatePayload.description = args.description;
    if (args.content) updatePayload.content = args.content;
    const updatedSnippet = await this.snippetService.updateByShortId(args.id, updatePayload);
    const plainSnippet = classToPlain(updatedSnippet);
    return plainSnippet;
  }

  @Mutation()
  async deleteSnippet(msg: IncomingMessage, args: {id: string}) {
    const deletedSnippet = await this.snippetService.deleteByShortId(args.id);
    const plainSnippet = classToPlain(deletedSnippet);
    return plainSnippet;
  }

}