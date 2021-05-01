import { BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../../enums/task-status.enum';
import { TaskStatusValidatorPipe } from './task-status-validator.pipe';

describe('TaskStatusValidatorPipe', () => {
  let pipe: TaskStatusValidatorPipe;

  beforeEach(() => {
    pipe = new TaskStatusValidatorPipe()
  })

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it("invalid status", () => {
    expect(() => pipe.transform("bad value")).toThrow(BadRequestException);
  });

  it("valid status", () => {
    const response = pipe.transform(TaskStatus.DONE);
    expect(response).toEqual(TaskStatus.DONE);
  });

});
