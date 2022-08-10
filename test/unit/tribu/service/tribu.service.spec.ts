import { TribuService } from 'src/tribu/services/tribu.service';
import {
  MockType,
  repositoryMockFactory,
} from '../../../utils/repository.mock';
import { Repository } from 'typeorm';
import { TribeEntity } from 'src/tribu/entity/tribu.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from './mock.module';
import { MetricEntity } from 'src/metric/entity/metric.entity';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Tribu service', () => {
  let service: TribuService;
  let tribeRepositoryMock: MockType<Repository<TribeEntity>>;
  let id: number = 0;
  let axiosMock: MockAdapter;
  let tribe: TribeEntity = {
    id: 1,
    name: 'name',
    organization: { id: 1, name: 'name', status: 1 },
    status: 1,
    repositories: [],
  };

  beforeEach(async () => {
    axiosMock = new MockAdapter(axios);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(TribeEntity),
          useFactory: repositoryMockFactory,
        },
        TribuService,
      ],
      imports: [
        TestModule,
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
        }),
      ],
    }).compile();
    service = module.get<TribuService>(TribuService);
    tribeRepositoryMock = module.get(getRepositoryToken(TribeEntity));
    tribe = {
      id: 1,
      name: 'name',
      organization: { id: 1, name: 'name', status: 1 },
      status: 1,
      repositories: [],
    };
  });

  it('Should thow http exception if tribus are null or undefined', async () => {
    tribeRepositoryMock.findOne.mockReturnValue(null);
    await expect(service.findTribu(id)).rejects.toThrow(
      `La tribu ${id} no se encuentra registrada`,
    );
  });

  it('Should thow http exception if tribus are an empty array', async () => {
    tribeRepositoryMock.findOne.mockReturnValue(tribe);
    await expect(service.findTribu(id)).rejects.toThrow(
      `La tribu ${id} no posee repositorios agregados`,
    );
  });

  it('Should thow http exception if listRepositories are an empty array', async () => {
    const m = new MetricEntity();
    const t = new TribeEntity();
    tribe.repositories = [
      {
        create_time: new Date(),
        id: 1,
        metric: m,
        name: 'name',
        state: 'state',
        status: 'status',
        tribe: t,
      },
    ];
    tribeRepositoryMock.findOne.mockReturnValue(tribe);
    await expect(service.findTribu(id)).rejects.toThrow(
      `La tribu ${id} no tiene repositorios que cumplan  con la cobertura necesaria`,
    );
  });

  it('Should return list repositories', async () => {
    const m = new MetricEntity();
    m.coverage = 80;
    const t = new TribeEntity();
    tribe.repositories = [
      {
        create_time: new Date(),
        id: 1,
        metric: m,
        name: 'name',
        state: 'E',
        status: 'status',
        tribe: t,
      },
    ];
    tribeRepositoryMock.findOne.mockReturnValue(tribe);
    axiosMock
      .onGet('http://localhost:3000/api/repository')
      .reply(200, [{ id: 1, state: 606 }]);

    const { repositories } = await service.findTribu(id);
    expect(repositories).toEqual([
      {
        id: 1,
        name: 'name',
        tribe: 'name',
        organization: 'name',
        coverage: 80,
        code_smells: undefined,
        bugs: undefined,
        vulnerabilities: undefined,
        hostpots: undefined,
        state: 'Habilitado',
        verficactionState: 'Aprobado',
      },
    ]);
  });
});
