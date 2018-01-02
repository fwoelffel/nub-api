import {Mutation, Query, Resolver} from "@nestjs/graphql";
import {SnippetService} from "../services/snippet/snippet.service";
import {SnippetInterface} from "../entities/snippet/snippet.entity";
import {IncomingMessage} from "http";
import {UseInterceptors} from "@nestjs/common";
import {TransformInterceptor} from "../interceptors/transform/transform.interceptor";

@Resolver('Snippet')
@UseInterceptors(TransformInterceptor)
export class SnippetResolvers {

  constructor(private readonly snippetService: SnippetService) {}

  /**
   * QUERIES
   */

  @Query()
  async getSnippets(obj, args, context, info) {
    const snippetEntities = await this.snippetService.getAll();
    return snippetEntities;
  }

  @Query()
  async getLastSnippets(obj, args, context, info) {
    const snippetEntities = await this.snippetService.getLastSnippets(args.count);
    return snippetEntities;
  }

  @Query()
  async getSnippetById(obj, args, context, info) {
    const snippetEntity = await this.snippetService.getByShortId(args.id);
    return snippetEntity;
  }

  /**
   * MUTATIONS
   */

  @Mutation()
  async createSnippet(msg: IncomingMessage, args: {}) {
    const createdEntity = await this.snippetService.create(args);
    const savedEntity = await this.snippetService.save(createdEntity);
    return savedEntity;
  }

  @Mutation()
  async updateSnippet(msg: IncomingMessage, args) {
    const updatePayload: SnippetInterface = {};
    if (args.name) updatePayload.name = args.name;
    if (args.description) updatePayload.description = args.description;
    if (args.content) updatePayload.content = args.content;
    const updatedSnippet = await this.snippetService.updateByShortId(args.id, updatePayload);
    return updatedSnippet;
  }

  @Mutation()
  async deleteSnippet(msg: IncomingMessage, args: {id: string}) {
    const deletedSnippet = await this.snippetService.deleteByShortId(args.id);
    return deletedSnippet;
  }

}