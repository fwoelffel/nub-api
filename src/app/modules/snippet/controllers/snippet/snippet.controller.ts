import {Inject, Controller, Get, Post, Param, Body, UseInterceptors} from '@nestjs/common';
import {SnippetService} from "../../services/snippet/snippet.service";
import {TransformInterceptor} from "../../transform.interceptor";

@UseInterceptors(TransformInterceptor)
@Controller('/snippets')
export class SnippetController {
  constructor(
    @Inject(SnippetService) private readonly snippetService: SnippetService
  ) {}

  @Get()
  async getAll() {
    return await this.snippetService.getAll();
  }

  @Get(':shortId')
  async getByShortId(@Param('shortId') sShortId) {
    return await this.snippetService.getByShortId(sShortId);
  }

  @Post()
  async create(@Body() s) {
    return await this.snippetService.save(this.snippetService.create(s));
  }

}
