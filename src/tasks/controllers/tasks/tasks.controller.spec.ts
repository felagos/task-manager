import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../../services/tasks/tasks.service';
import { TasksController } from './tasks.controller';

const mockTaskService = () => ({

});

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        { provide: TasksService, useFactory: mockTaskService }
      ],
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })]
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
