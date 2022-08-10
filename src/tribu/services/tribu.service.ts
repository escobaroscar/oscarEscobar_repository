import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationService } from 'src/organization/services/organization.service';
import { Repository } from 'typeorm';
import { CreateTribeDto } from '../dtos/tribe.dto';
import { TribeEntity } from '../entity/tribu.entity';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class TribuService {
  private readonly axios: AxiosInstance = axios;
  constructor(
    private readonly organizationService: OrganizationService,
    @InjectRepository(TribeEntity) private readonly tribeRepository: Repository<TribeEntity>,
    private envConfig: ConfigService,
  ) {}
  async create(createTribeDto: CreateTribeDto) {
    try {
      const { organization } = createTribeDto;
      const data = await this.organizationService.findOrganization(
        organization,
      );
      if (!data)
        throw new HttpException(
          `No se encontro la organización con ${organization} `,
          HttpStatus.NOT_FOUND,
        );
      const createOrganization = this.tribeRepository.create({
        ...createTribeDto,
        organization: data,
      });
      await this.tribeRepository.save(createOrganization);
      return createOrganization;
    } catch (error) {
      throw new HttpException(
        'No se creo el registro, intente mas tarde',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneId(id: number) {
    let findTribu = await this.tribeRepository.findOne({ where: { id: id } });
    if (!findTribu) {
      findTribu = null;
    }
    return findTribu;
  }

  async findTribu(id: number) {
    let listRepositories = [];
    const currentYear = new Date().getFullYear();

    let findTribu:TribeEntity = await this.tribeRepository.findOne({
      relations: ['organization', 'repositories.metric'],
      where: { id: id },
    });
    if (!findTribu)
      throw new HttpException(
        `La tribu ${id} no se encuentra registrada`,
        HttpStatus.NOT_FOUND,
      );
    if ([0].includes(findTribu?.repositories?.length || 0))
      throw new HttpException(
        `La tribu ${id} no posee repositorios agregados`,
        HttpStatus.ACCEPTED,
      );

    findTribu?.repositories.map((repository, i) => {
      if (
        repository?.metric &&
        repository?.create_time.getFullYear() == currentYear &&
        repository.metric.coverage > 75 &&
        repository.state == 'E'
      ) {
        listRepositories.push({
          id: repository?.id,
          name: repository?.name,
          tribe: findTribu?.name,
          organization: findTribu?.organization.name,
          coverage: repository?.metric?.coverage,
          code_smells: repository?.metric?.code_smells,
          bugs: repository?.metric?.bugs,
          vulnerabilities: repository?.metric?.vulnerabilities,
          hostpots: repository?.metric?.hostpot,
          state: this.parseState(repository?.state),
        });
      }
    });
    if ([0].includes(listRepositories.length || 0))
      throw new HttpException(
        `La tribu ${id} no tiene repositorios que cumplan  con la cobertura necesaria`,
        HttpStatus.ACCEPTED,
      );
      
    const { data } = await this.axios.get(
      `${this.envConfig.get('API_URL')}/repository`,
    );
    
    listRepositories.map((repository, i) => {
      listRepositories[i] = {
        ...repository,
        verficactionState: this.searchState(repository?.id, data),
      };
    });
    return { repositories: listRepositories };
  }

  private parseState(code: string) {
    let state = null;
    switch (code) {
      case 'E':
        state = 'Habilitado';
        break;
      case 'D':
        state = 'Deshabilitado';
        break;
      case 'E':
        state = 'Archivado';
        break;
    }
    return state;
  }

  private searchState(id: number, data: any) {
    const respository = data.filter((element) => element.id == id);
    if (respository && respository.length >0) {
      return this.parseStateRepository(respository[0].state);
    }
  }

  private parseStateRepository(codeNumber: number) {
    let state = null;
    switch (codeNumber) {
      case 604:
        state = 'Verificado';
        break;
      case 605:
        state = 'En espera';
        break;
      case 606:
        state = 'Aprobado';
        break;
    }
    return state;
  }
}
