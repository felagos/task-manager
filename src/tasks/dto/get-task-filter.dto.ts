import { TaskStatus } from "src/models/Task.model";

export class GetTaskFilterDto {
    status: TaskStatus;
    search: string;
}