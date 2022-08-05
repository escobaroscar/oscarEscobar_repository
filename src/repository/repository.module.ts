import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryEntity } from './entity/repository.entity';
import { RepositoryController } from './repository.controller';
import { RepositoryService } from './repository.service';

@Module({
  controllers: [RepositoryController],
  providers: [RepositoryService],
  imports:[
    TypeOrmModule.forFeature([RepositoryEntity])
  ],
})
export class RepositoryModule {}
