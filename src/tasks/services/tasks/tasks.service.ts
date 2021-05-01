import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../auth/entity/user.entity";
import { TaskStatus } from "../../../enums/task-status.enum";
import { CreateTaskDto } from "../../dto/create-task.dto";
import { GetTaskFilterDto } from "../../dto/get-task-filter.dto";
import { Task } from "../../../tasks/enitty/task.entity";
import { TaskRespository } from "../../repository/task.repository";

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskRespository) private taskRepository: TaskRespository
	) {}

	async getTaskById(id: number, user: User): Promise<Task> {
		const found = await this.taskRepository.findOne({
			where: { id, idUser: user.id },
		});
		if (!found) throw new NotFoundException(`Task with id ${id} not found`);
		return found;
	}

	createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
		return this.taskRepository.createTask(createTaskDto, user);
	}

	async deleteTask(id: number, user: User) {
		const result = await this.taskRepository.delete({ id, idUser: user.id });
		if (result.affected === 0)
			throw new NotFoundException(`Task with id ${id} not found`);
	}

	async updateStatus(
		id: number,
		status: TaskStatus,
		user: User
	): Promise<Task> {
		const task = await this.getTaskById(id, user);
		task.status = status;
		await task.save();

		return task;
	}

	getTasks(filter: GetTaskFilterDto, user: User): Promise<Task[]> {
		return this.taskRepository.getTasks(filter, user);
	}
}
