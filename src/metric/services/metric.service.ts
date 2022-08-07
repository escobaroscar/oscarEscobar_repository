import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetricDto } from '../dtos/create-metric.dto';
import { MetricEntity } from '../entity/metric.entity';

@Injectable()
export class MetricService {

    constructor(
        @InjectRepository(MetricEntity)
        private readonly metricRepository: Repository<MetricEntity>,
      ) {}

      async create(reateMetricDto: CreateMetricDto){
        try {
            const createMetric = this.metricRepository.create(reateMetricDto);
            await this.metricRepository.save( createMetric );
            return createMetric;
          } catch (error) {
              throw new HttpException('No se creo el registro, intente mas tarde', HttpStatus.INTERNAL_SERVER_ERROR);
          }
    }

    async findOneId(id: number) {
      let findMetric = await this.metricRepository.findOne({  relations: ['repository'], where: { id_repository: id } });
     if (!findMetric) {
      throw new HttpException(`La Metrica ${id} no se encuentra registrada`, HttpStatus.NOT_FOUND);
     }

     return findMetric;
   }

}
