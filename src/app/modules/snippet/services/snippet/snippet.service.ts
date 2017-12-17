import {Component, Inject} from '@nestjs/common';
import {snippetRepositoryToken} from "../../snippet.provider";
import {Snippet, SnippetInterface} from "../../snippet.entity";
import {Repository} from "typeorm";
import * as shortid from "shortid";

@Component()
export class SnippetService {
  constructor(
    @Inject(snippetRepositoryToken) private readonly snippetRepository: Repository<Snippet>
  ) {}

  create(s: SnippetInterface): Snippet {
    return this.snippetRepository.create({
      ...s,
      shortId: shortid.generate()
    });
  }

  async save(s: Snippet): Promise<Snippet> {
    return await this.snippetRepository.save(s);
  }

  async getAll(): Promise<Snippet[]> {
    return await this.snippetRepository.find();
  }

  async getById(sId: number): Promise<Snippet | undefined> {
    return await this.snippetRepository.findOneById(sId);
  }

  async getByShortId(sShortId: string): Promise<Snippet | undefined> {
    return await this.snippetRepository.findOne({
      where: {
        shortId: sShortId
      }
    });
  }

}
