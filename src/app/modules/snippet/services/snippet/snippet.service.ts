import {Component, Inject} from '@nestjs/common';
import {snippetRepositoryToken} from "../../providers/snippet/snippet.provider";
import {Snippet, SnippetInterface} from "../../entities/snippet/snippet.entity";
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

  async updateByShortId(sShortId: string, sPayload: SnippetInterface): Promise<Snippet> {
    const storedSnippet = await this.snippetRepository.findOne({shortId: sShortId});
    const updatedSnippet = {
      ...storedSnippet,
      ...sPayload
    };
    const savedSnippet = await this.snippetRepository.save(updatedSnippet);
    return savedSnippet;
  }

  async getLastSnippets(count: number = 15): Promise<Snippet[]> {
    const snippets = await this.snippetRepository
        .createQueryBuilder('snippet')
        .orderBy('snippet.createdDate', 'DESC')
        .limit(count)
        .getMany();
    return snippets;
  }
}
