import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskStatus } from 'src/enums/task-status.enum';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTaskFilterDto } from 'src/tasks/dto/get-task-filter.dto';
import { Task } from 'src/tasks/enitty/task.entity';
import { TaskStatusValidatorPipe } from 'src/tasks/pipes/task-status-validator.pipe';
import { TasksService } from 'src/tasks/services/tasks/tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filter: GetTaskFilterDto): Promise<Task[]> {
        return this.taskService.getTasks(filter);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidatorPipe) status: TaskStatus): Promise<Task> {
        return this.taskService.updateStatus(id, status);
    }

}
