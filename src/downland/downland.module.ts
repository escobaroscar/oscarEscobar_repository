import { Module } from '@nestjs/common';
import { DownlandService } from './services/downland.service';
import { DownlandController } from './controllers/downland.controller';

@Module({
  providers: [DownlandService],
  controllers: [DownlandController]
})
export class DownlandModule {}
