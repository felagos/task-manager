import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskModel, TaskStatus } from 'src/models/Task.model';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTaskFilterDto } from 'src/tasks/dto/get-task-filter.dto';
import { TasksService } from 'src/tasks/services/tasks/tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query() filter: GetTaskFilterDto): TaskModel[] {
        if (Object.keys(filter).length === 0) return this.taskService.getAllTasks();
        return this.taskService.getTaskWithFilter(filter);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): TaskModel {
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
        return this.taskService.updateStatus(id, status);
    }

}
