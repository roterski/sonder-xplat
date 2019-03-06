import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from '../services/posts.service';
import { Post } from '../entities';

describe('Posts Controller', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService, {
        provide: getRepositoryToken(Post),
        useValue: {}
      }],
    }).compile();

    postsService = testingModule.get<PostsService>(PostsService);
    postsController = testingModule.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(postsController).toBeDefined();
  });
});
