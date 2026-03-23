import { Test, TestingModule } from '@nestjs/testing';
import { ViagensController } from './viagens.controller';

describe('ViagensController', () => {
  let controller: ViagensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViagensController],
    }).compile();

    controller = module.get<ViagensController>(ViagensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
