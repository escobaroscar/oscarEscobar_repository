import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from '../dtos/create-organization.dto';
import { UpdateOrganizationDto } from '../dtos/update-product.dto';
import { OrganizationEntity } from '../entity/organization.entity';

@Injectable()
export class OrganizationService {
    private readonly logs = new Logger('OrganizationService');

    constructor(
        @InjectRepository(OrganizationEntity)
        private readonly organizationRepository: Repository<OrganizationEntity>,
      ) {}
      findAll() {
            return this.organizationRepository.find();
      }
      async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
        await this.organizationRepository.update(id, updateOrganizationDto);
        const updatedTodo = await this.organizationRepository.findOne({ where: { id: id } });
        if (updatedTodo) {
            throw new HttpException(`Organización ${id} actualizada `, HttpStatus.OK);
        }
        throw new HttpException(`No se encontro la organización con ${id} `, HttpStatus.NOT_FOUND);
      }

      async create(createOrganizationDto: CreateOrganizationDto) {
        try {
          const createOrganization = this.organizationRepository.create(createOrganizationDto);
          await this.organizationRepository.save( createOrganization );
          return createOrganization;
        } catch (error) {
            throw new HttpException('INo se creo el registro, intente mas tarde', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

      async delete(id: number) {
        const organization = await this.organizationRepository.delete(id);
        if (!organization.affected) {
            throw new HttpException('Organizacion no encontrada', HttpStatus.NOT_FOUND);
          }
          throw new HttpException('Organizacion eliminada con exito', HttpStatus.OK);
      }
}
