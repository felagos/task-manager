import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskModel, TaskStatus } from 'src/models/Task.model';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTaskFilterDto } from 'src/tasks/dto/get-task-filter.dto';
import { v1 as uuid } from 'uuid';

@Injectable()
export class TasksService {

    private tasks: TaskModel[] = [];

    getAllTasks(): TaskModel[] {
        return this.tasks;
    }

    getTaskWithFilter(filter: GetTaskFilterDto): TaskModel[] {
        const { search, status } = filter
        return this.tasks.filter(task => (task.status === status || task.title.includes(search) || task.description.includes(search)));
    }

    getTaskById(id: string): TaskModel {
        const found = this.tasks.find(task => task.id === id);
        if(!found) throw new NotFoundException(`Task with id ${id} not found`);
        return found
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

    deleteTask(id: string) {
        const found =this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    updateStatus(id: string, status: TaskStatus) {
        const task = this.getTaskById(id);
        task.status = status;

        return task;
    }

}
