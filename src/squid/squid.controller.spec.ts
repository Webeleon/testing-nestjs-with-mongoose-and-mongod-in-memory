import { Test, TestingModule } from '@nestjs/testing';
import { SquidController } from './squid.controller';
import { SquidService } from './squid.service';

describe('SquidController', () => {
  let controller: SquidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SquidController],
      providers: [SquidService],
    }).compile();

    controller = module.get<SquidController>(SquidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
