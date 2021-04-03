import { Controller } from '@nestjs/common';
import { TasksService } from 'src/tasks/services/tasks/tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) {}

}
