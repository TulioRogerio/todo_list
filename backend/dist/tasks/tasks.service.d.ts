import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, createDto: CreateTaskDto): Promise<{
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
    findAll(userId: number): Promise<{
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
    findOne(userId: number, id: number): Promise<{
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
    update(userId: number, id: number, updateDto: UpdateTaskDto): Promise<{
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
    remove(userId: number, id: number): Promise<{
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
    toggle(userId: number, id: number): Promise<{
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
