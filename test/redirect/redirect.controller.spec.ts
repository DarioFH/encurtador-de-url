import { Test, TestingModule } from '@nestjs/testing';
import { RedirectController } from '../../src/redirect/redirect.controller';
import { RedirectService } from '../../src/redirect/redirect.service';

describe('RedirectController', () => {
  let controller: RedirectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedirectController],
      providers: [RedirectService],
    }).compile();

    controller = module.get<RedirectController>(RedirectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
