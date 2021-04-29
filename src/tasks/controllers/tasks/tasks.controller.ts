import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorators';
import { User } from 'src/auth/entity/user.entity';
import { TaskStatus } from 'src/enums/task-status.enum';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTaskFilterDto } from 'src/tasks/dto/get-task-filter.dto';
import { Task } from 'src/tasks/enitty/task.entity';
import { TaskStatusValidatorPipe } from 'src/tasks/pipes/task-status-validator.pipe';
import { TasksService } from 'src/tasks/services/tasks/tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filter: GetTaskFilterDto, @GetUser() user: User): Promise<Task[]> {
        return this.taskService.getTasks(filter, user);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
        return this.taskService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@GetUser() user: User, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
        return this.taskService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidatorPipe) status: TaskStatus, @GetUser() user: User): Promise<Task> {
        return this.taskService.updateStatus(id, status, user);
    }

}
