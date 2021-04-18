import { IsNotEmpty } from "class-validator";
import { TaskStatus } from "../../models/Task.model";

export class GetTaskFilterDto {
    @IsNotEmpty()
    status: TaskStatus;

    @IsNotEmpty()
    search: string;
}