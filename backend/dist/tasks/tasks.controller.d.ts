import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(req: any, createDto: CreateTaskDto): Promise<{
        id: number;
        organizationId: number | null;
        title: string;
        description: string | null;
        dueDate: Date | null;
        done: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    findAll(req: any): Promise<{
        id: number;
        organizationId: number | null;
        title: string;
        description: string | null;
        dueDate: Date | null;
        done: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: number;
        organizationId: number | null;
        title: string;
        description: string | null;
        dueDate: Date | null;
        done: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    update(req: any, id: string, updateDto: UpdateTaskDto): Promise<{
        id: number;
        organizationId: number | null;
        title: string;
        description: string | null;
        dueDate: Date | null;
        done: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    toggle(req: any, id: string): Promise<{
        id: number;
        organizationId: number | null;
        title: string;
        description: string | null;
        dueDate: Date | null;
        done: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    remove(req: any, id: string): Promise<{
        id: number;
        organizationId: number | null;
        title: string;
        description: string | null;
        dueDate: Date | null;
        done: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
}
