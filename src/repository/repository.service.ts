import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TribuService } from 'src/tribu/services/tribu.service';
import { Repository } from 'typeorm';
import { CreateRepositoryDto } from './dtos/create-repository.dto';
import { RepositoryEntity } from './entity/repository.entity';

@Injectable()
export class RepositoryService {

    constructor(
        @InjectRepository(RepositoryEntity)
        private readonly repositoryRepository: Repository<RepositoryEntity>,
        private readonly tribuService: TribuService 
      ) {}
      
    private repositories = [
        {id:1,state: 604},
        {id:2,state:605},
        {id:3,state:606}
         ];
    findAll(){
        return this.repositories;
    }

    async create(createRepositoryDto: CreateRepositoryDto){
        try {
        let tribu = await this.tribuService.findOneId(createRepositoryDto.id_tribe);
        if(tribu){
                let createRepository = this.repositoryRepository.create(createRepositoryDto);
                createRepository.tribe=tribu;
                await this.repositoryRepository.save( createRepository );
                return createRepository;
        }else throw new HttpException(`Tribu ${createRepositoryDto.id_tribe} no encontrada`, HttpStatus.NOT_FOUND);

    } catch (error) {
        console.log(error);
        
        throw new HttpException('No se creo el registro, intente mas tarde', HttpStatus.INTERNAL_SERVER_ERROR);
    }
        
    }
    async findOneId(id: number) {

        let findRepository = await this.repositoryRepository.findOne({  relations: ['metric'], where: { id: id } });
       if (!findRepository) {
        throw new HttpException(`El repositorio ${id} no se encuentra registrado`, HttpStatus.NOT_FOUND);
       }

       return findRepository;
     }
    
}
