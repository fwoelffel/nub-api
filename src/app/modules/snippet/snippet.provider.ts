import { Connection } from "typeorm";
import {databaseConnectionToken} from "../database/connection.provider";
import {Snippet} from "./snippet.entity";

export const snippetRepositoryToken = 'SnippetRepositoryToken';
export const snippetRepository = {
  provide: snippetRepositoryToken,
  useFactory: (connection: Connection) => connection.getRepository(Snippet),
  inject: [databaseConnectionToken],
};
