import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskStatus } from '../../../enums/task-status.enum';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { GetTaskFilterDto } from '../../dto/get-task-filter.dto';
import { TaskRespository } from '../../repository/task.repository';
import { TasksService } from './tasks.service';

const mockUser: any = {
  id: Date.now(),
  username: ""
};

const mockTask = { id: Date.now(), title: "", description: "", status: TaskStatus.OPEN, user: mockUser, idUser: mockUser.id }

const mockTasks = [mockTask];

const mockTaskRespository = () => ({
  getTasks: jest.fn().mockReturnValue(mockTasks),
  findOne: jest.fn(),
  createTask: jest.fn().mockReturnValue(mockTask),
  delete: jest.fn()
});

const filterDto: GetTaskFilterDto = {
  search: "",
  status: TaskStatus.OPEN
};

const createDto: CreateTaskDto = {
  description: "",
  title: ''
};

const idTask = Date.now();

describe('TasksService', () => {
  let service: TasksService;
  let taskRespository: TaskRespository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRespository, useFactory: mockTaskRespository }
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    taskRespository = module.get<TaskRespository>(TaskRespository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTasks', () => {

    it('get all tasks', async () => {
      const tasks = await service.getTasks(filterDto, mockUser);

      expect(taskRespository.getTasks).toHaveBeenCalled();
      expect(tasks).toEqual(mockTasks);
    });

  });

  describe('getTaskById', () => {

    it('get task by id', async () => {
      const query = { where: { id: idTask, idUser: mockUser.id } };

      (<any>taskRespository.findOne).mockResolvedValue(mockTask);
      const task = await service.getTaskById(idTask, mockUser);

      expect(taskRespository.findOne).toHaveBeenCalledWith(query);
      expect(task).toEqual(task);
    });

    it('throw error if task is not found', () => {
      (<any>taskRespository.findOne).mockResolvedValue(false);

      expect(service.getTaskById(idTask, mockUser)).rejects.toThrow(NotFoundException);
    });

  });

  describe('createTask', () => {

    it('create a task', async () => {
      const response = await service.createTask(createDto, mockUser);

      expect(response).toEqual(mockTask);
    });

  });

  describe('deleteTask', () => {

    it("delete task that exists", () => {
      const query = { id: idTask, idUser: mockUser.id };

      (<any>taskRespository.delete).mockResolvedValue({ affected: 1 });
      service.deleteTask(idTask, mockUser);

      expect(taskRespository.delete).toHaveBeenCalledWith(query);
    });

    it('delete task not found', () => {
      (<any>taskRespository.delete).mockResolvedValue({ affected: 0 });

      expect(service.deleteTask(idTask, mockUser)).rejects.toThrow(NotFoundException);
    });

  });

  describe('updateStatus', () => {

    it("update task than exists", async () => {
      taskRespository.findOne = jest.fn().mockResolvedValue({
        status: '',
        save: jest.fn()
      });

      const response = await service.updateStatus(idTask, TaskStatus.IN_PROGRESS, mockUser);

      expect(response.status).toEqual(TaskStatus.IN_PROGRESS);
    });

  });

});
