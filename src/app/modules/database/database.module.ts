import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
  ]
})
export class DatabaseModule {}
