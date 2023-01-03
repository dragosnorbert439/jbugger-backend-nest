import {Test, TestingModule} from '@nestjs/testing';
import {UserNameService} from './user-name.service';

describe('UsernameService', () => {
  let service: UserNameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserNameService],
    }).compile();

    service = module.get<UserNameService>(UserNameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
