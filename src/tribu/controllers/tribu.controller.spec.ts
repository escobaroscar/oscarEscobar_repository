import { Test, TestingModule } from '@nestjs/testing';
import { TribuService } from '../services/tribu.service';
import { TribuController } from './tribu.controller';


describe('TribeController', () => {
  let tribuController: TribuController;
  let tribuService: TribuService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [TribuController],
        providers: [TribuService],
      }).compile();

      tribuService = moduleRef.get<TribuService>(TribuService);
    tribuController = moduleRef.get<TribuController>(TribuController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = 
      {
        repositories: [
            {
                id: 1,
                name: "cd-common-utils",
                tribe: "Centro Digital",
                organization: "Banco del Pichincha",
                coverage: 76,
                code_smells: "1",
                bugs: "0",
                vulnerabilities: "2",
                hostpots: "0",
                state: "Habilitado",
                verficactionState: "Verificado"
            },
            {
                id: 2,
                name: "cd-common-text",
                tribe: "Centro Digital",
                organization: "Banco del Pichincha",
                coverage: 80,
                code_smells: "0",
                bugs: "0",
                vulnerabilities: "0",
                hostpots: "0",
                state: "Habilitado",
                verficactionState: "En espera"
            }
        ]
    }
      ;
      jest.spyOn(tribuService, 'findTribu').mockImplementation(() => result);

      expect(await tribuController.getTribeById(1)).toBe(result);
    });
  })
});
