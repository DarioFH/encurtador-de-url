import { Test, TestingModule } from '@nestjs/testing';
import { EncurtadorController } from '../../src/encurtador/encurtador.controller';
import { EncurtadorService } from '../../src/encurtador/encurtador.service';

describe('EncurtadorController', () => {
  let controller: EncurtadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncurtadorController],
      providers: [EncurtadorService],
    }).compile();

    controller = module.get<EncurtadorController>(EncurtadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
