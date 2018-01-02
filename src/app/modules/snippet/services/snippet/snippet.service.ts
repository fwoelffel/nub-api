import {Component} from '@nestjs/common';
import {Snippet, SnippetInterface} from "../../entities/snippet/snippet.entity";
import {Repository} from "typeorm";
import * as shortid from "shortid";
import {InjectRepository} from "@nestjs/typeorm";

/**
 * This component provides methods to manage Snippet entities.
 */
@Component()
export class SnippetService {

  constructor(
    @InjectRepository(Snippet) private readonly snippetRepository: Repository<Snippet>
  ) {}

  /**
   * This function returns a new Snippet object
   * @param {SnippetInterface} sPayload The Snippet payload.
   * @returns {Snippet}
   */
  create(sPayload: SnippetInterface): Snippet {
    const createdSnippet = this.snippetRepository.create({
      ...sPayload,
      shortId: shortid.generate()
    });
    return createdSnippet;
  }

  /**
   * This function saves the given Snippet object and returns the saved Snippet entity.
   * @async
   * @param {Snippet} s The Snippet object to be saved.
   * @returns {Promise<Snippet>}
   */
  async save(s: Snippet): Promise<Snippet> {
    const savedSnippet = await this.snippetRepository.save(s);
    return savedSnippet;
  }

  /**
   * This function returns all stored Snippet entities.
   * @async
   * @returns {Promise<Snippet[]>}
   */
  async getAll(): Promise<Snippet[]> {
    const storedSnippets = await this.snippetRepository.find();
    return storedSnippets;
  }

  /**
   * This function returns the stored Snippet entity matching the given id.
   * @param {number} sId A Snippet entity id.
   * @returns {Promise<Snippet | undefined>}
   */
  async getById(sId: number): Promise<Snippet | undefined> {
    const storedSnippet = await this.snippetRepository.findOneById(sId);
    return storedSnippet;
  }

  /**
   * This function returns the stored Snippet entity matching the given shortId
   * @param {string} sShortId A Snippet entity shortId.
   * @returns {Promise<Snippet | undefined>}
   */
  async getByShortId(sShortId: string): Promise<Snippet | undefined> {
    const storedSnippet = await this.snippetRepository.findOne({
      where: {
        shortId: sShortId
      }
    });
    return storedSnippet;
  }

  /**
   * This function updates the stored Snippet entity matching the given shortId with the given Snippet attributes
   * and returns the updated Snippet entity.
   * @param {string} sShortId A Snippet entity shortId.
   * @param {SnippetInterface} sPayload A Snippet payload.
   * @returns {Promise<Snippet>}
   */
  async updateByShortId(sShortId: string, sPayload: SnippetInterface): Promise<Snippet> {
    const storedSnippet = await this.snippetRepository.findOne({shortId: sShortId});
    Object.assign(storedSnippet, sPayload);
    const updatedSnippet = await this.save(storedSnippet);
    return updatedSnippet;
  }

  /**
   * This function returns the last `count` Snippet entities ordered by descending creation date.
   * @param {number} [count=15] The number of Snippet to be returned (defaults to 15).
   * @returns {Promise<Snippet[]>}
   */
  async getLastSnippets(count: number = 15): Promise<Snippet[]> {
    const snippets = await this.snippetRepository
      .createQueryBuilder('snippet')
      .orderBy('snippet.createdDate', 'DESC')
      .limit(count)
      .getMany();
    return snippets;
  }

  /**
   * This function deletes the Snippet matching the given id and returns the deleted entity.
   * @param {string} sShortId
   * @returns {Promise<Snippet|void>}
   */
  async deleteByShortId(sShortId: string): Promise<Snippet | void> {
    const storedSnippet = await this.getByShortId(sShortId);
    if (storedSnippet) {
      const deletedSnippet = await this.snippetRepository.remove(storedSnippet);
      return deletedSnippet;
    }
  }
}
