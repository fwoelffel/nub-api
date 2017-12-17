import {Module} from '@nestjs/common';
import {DatabaseModule} from "./modules/database/database.module";

@Module({})
@Module({
  modules: [
    DatabaseModule,
  ]
})
export class ApplicationModule {}