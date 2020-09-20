import { Test, TestingModule } from '@nestjs/testing';
import { SquidService } from './squid.service';

describe('SquidService', () => {
  let service: SquidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SquidService],
    }).compile();

    service = module.get<SquidService>(SquidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
