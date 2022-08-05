import { Module } from '@nestjs/common';
import { MetricService } from './services/metric.service';
import { MetricController } from './controllers/metric.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricEntity } from './entity/metric.entity';

@Module({
  providers: [MetricService],
  controllers: [MetricController],
  imports:[
    TypeOrmModule.forFeature([MetricEntity])
  ]
})
export class MetricModule {}
