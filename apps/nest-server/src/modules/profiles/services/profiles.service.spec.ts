import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';

describe('ProfilesService', () => {
  let service: ProfilesService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilesService],
    }).compile();
    service = module.get<ProfilesService>(ProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
