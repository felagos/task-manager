import { User } from "../../auth/entity/user.entity";
import { TaskStatus } from "../../enums/task-status.enum";
import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tasks" })
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne(() => User, user => user.tasks, { eager: false })
    @JoinColumn({name: 'id_user'})
    user: User;

    @Column({name: "id_user"}) 
    idUser: number;

}