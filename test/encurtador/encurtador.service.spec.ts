import { Test, TestingModule } from '@nestjs/testing';
import { EncurtadorService } from '../../src/encurtador/encurtador.service';

describe('EncurtadorService', () => {
  let service: EncurtadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncurtadorService],
    }).compile();

    service = module.get<EncurtadorService>(EncurtadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
