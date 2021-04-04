import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from 'src/models/Task.model';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { v1 as uuid } from 'uuid';

@Injectable()
export class TasksService {

    private tasks: TaskModel[] = [];

    getAllTasks(): TaskModel[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): TaskModel {
        const { title, description } = createTaskDto;
        const task: TaskModel = {
            title,
            description,
            status: TaskStatus.OPEN,
            id: uuid()
        };

        this.tasks.push(task);

        return task;
    }

}
