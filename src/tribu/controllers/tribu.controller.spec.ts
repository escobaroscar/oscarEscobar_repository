import { Test, TestingModule } from '@nestjs/testing';
import { TribuService } from '../services/tribu.service';
import { TribuController } from './tribu.controller';


describe('TribeController', () => {
  let service: TribuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TribuService],
    }).compile();

    service = module.get<TribuService>(TribuService);
  });

  it('should be defined', () => {
    service.findTribu(1);
    expect(service).toBeDefined();
  });
});
