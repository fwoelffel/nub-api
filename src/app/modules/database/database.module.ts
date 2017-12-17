import {Module} from '@nestjs/common';
import {databaseConnection} from "./connection.provider";

@Module({
  components: [
    databaseConnection
  ],
  exports: [
    databaseConnection
  ]
})
export class DatabaseModule {}
