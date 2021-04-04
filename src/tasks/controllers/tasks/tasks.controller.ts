import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskModel } from 'src/models/Task.model';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TasksService } from 'src/tasks/services/tasks/tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(): TaskModel[] {
        return this.taskService.getAllTasks();
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }


}
