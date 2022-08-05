import { Module } from '@nestjs/common';
import { TribuService } from './services/tribu.service';
import { TribuController } from './controllers/tribu.controller';
import { TribeEntity } from './entity/tribu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationModule } from 'src/organization/organization.module';

@Module({
  providers: [TribuService],
  controllers: [TribuController],
  imports:[
    OrganizationModule,
    TypeOrmModule.forFeature([TribeEntity])
  ],
  
  
})
export class TribuModule {}
