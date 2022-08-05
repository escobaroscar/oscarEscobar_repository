import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationService } from 'src/organization/services/organization.service';
import { Repository } from 'typeorm';
import { CreateTribeDto } from '../dtos/tribe.dto';
import { TribeEntity } from '../entity/tribu.entity';

@Injectable()
export class TribuService {
    constructor(
        private readonly organizationService : OrganizationService,
        @InjectRepository(TribeEntity)
        private readonly tribeRepository: Repository<TribeEntity>,
        
      ) {}
    async create(createTribeDto: CreateTribeDto) {
        try {
          const{organization}=createTribeDto;
            const data = await this.organizationService.findOrganization(organization);
            if(!data) throw new HttpException(`No se encontro la organización con ${organization} `, HttpStatus.NOT_FOUND);
              const createOrganization = this.tribeRepository.create({...createTribeDto,organization:data});
              await this.tribeRepository.save( createOrganization );
              return createOrganization;
        } catch (error) {
            throw new HttpException('No se creo el registro, intente mas tarde', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
}
