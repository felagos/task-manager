import { IsIn, IsOptional } from "class-validator";
import { TaskStatus } from "../../models/Task.model";

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
    status: TaskStatus;

    @IsOptional()
    search: string;
}