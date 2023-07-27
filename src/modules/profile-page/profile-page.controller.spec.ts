import { Test, TestingModule } from '@nestjs/testing';

import { ProfilePageController } from './profile-page.controller';
import { ProfilePageService } from './profile-page.service';

describe('ProfilePageController', () => {
  let controller: ProfilePageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilePageController],
      providers: [ProfilePageService]
    }).compile();

    controller = module.get<ProfilePageController>(ProfilePageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
