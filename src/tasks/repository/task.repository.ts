import { User } from "../../auth/entity/user.entity";
import { TaskStatus } from "../../enums/task-status.enum";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { GetTaskFilterDto } from "../dto/get-task-filter.dto";
import { Task } from "../enitty/task.entity";

@EntityRepository(Task)
export class TaskRespository extends Repository<Task> {

    async createTask(taskDto: CreateTaskDto, user: User): Promise<Task> {
        const task = new Task();
        task.title = taskDto.title;
        task.description = taskDto.description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();

        delete task.user;

        return task;
    }

    async getTasks(filter: GetTaskFilterDto, user: User): Promise<Task[]> {
        const { search, status } = filter;
        const query = this.createQueryBuilder("task");
        query.where("task.id_user = :userId", { userId: user.id });

        if (status) {
            query.andWhere("task.status = :status", { status });
        }
        if (search) {
            query.andWhere("(task.description like :search or task.title like :search)", { search: `%${search}%` });
        }

        return await query.getMany();

    } 

}