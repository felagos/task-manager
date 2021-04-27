import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './controllers/tasks/tasks.controller';
import { TaskRespository } from './repository/task.repository';
import { TasksService } from './services/tasks/tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRespository]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule { }
