import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './controllers/tasks/tasks.controller';
import { TaskRespository } from './repository/task.repository';
import { TasksService } from './services/tasks/tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRespository])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule { }
