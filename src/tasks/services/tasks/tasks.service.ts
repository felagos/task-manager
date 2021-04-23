import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from 'src/enums/task-status.enum';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTaskFilterDto } from 'src/tasks/dto/get-task-filter.dto';
import { Task } from 'src/tasks/enitty/task.entity';
import { TaskRespository } from 'src/tasks/repository/task.repository';

@Injectable()
export class TasksService {

    constructor(@InjectRepository(TaskRespository) private taskRepository: TaskRespository) {}

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if(!found) throw new NotFoundException(`Task with id ${id} not found`);
        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(id: number) {
        const result = await this.taskRepository.delete(id);
        if(result.affected === 0) throw new NotFoundException(`Task with id ${id} not found`);
    }

    async updateStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();

        return task;
    }

    getTasks(filter: GetTaskFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filter);
    }

}
