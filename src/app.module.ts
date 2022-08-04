import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
