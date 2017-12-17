import { createConnection } from 'typeorm';

export const databaseConnectionToken = 'DatabaseProviderToken';
export const databaseConnection =  {
  provide: databaseConnectionToken,
  useFactory: async () => await createConnection({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    username: process.env.POSTGRES_USER || "user",
    password: process.env.POSTGRES_PASSWORD || "password",
    database: process.env.POSTGRES_DB || "db",
    logging: false,
    entities: [
      __dirname + "/../**/**.entity{.ts,.js}",
    ],
    synchronize: true,
  })
};
