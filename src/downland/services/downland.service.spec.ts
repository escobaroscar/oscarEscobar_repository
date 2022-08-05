import { Test, TestingModule } from '@nestjs/testing';
import { DownlandService } from './downland.service';

describe('DownlandService', () => {
  let service: DownlandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DownlandService],
    }).compile();

    service = module.get<DownlandService>(DownlandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
