export interface TaskModel {
    id: string;
    title: string;
    description: string;
    status: TaskModel;
}

export enum TaskStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}