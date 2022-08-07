import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryEntity } from './entity/repository.entity';
import { RepositoryController } from './controllers/repository.controller';
import { RepositoryService } from './repository.service';
import { TribuModule } from 'src/tribu/tribu.module';

@Module({
  controllers: [RepositoryController],
  providers: [RepositoryService],
  imports:[
    TribuModule,
    TypeOrmModule.forFeature([RepositoryEntity])
  ],
})
export class RepositoryModule {}
