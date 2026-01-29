// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: createDto.title,
        description: createDto.description,
        dueDate: createDto.dueDate ? new Date(createDto.dueDate) : null,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  async findOne(userId: number, id: number) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(userId: number, id: number, updateDto: UpdateTaskDto) {
    await this.findOne(userId, id);
    return this.prisma.task.update({
      where: { id },
      data: {
        ...updateDto,
        dueDate: updateDto.dueDate !== undefined 
          ? (updateDto.dueDate ? new Date(updateDto.dueDate) : null)
          : undefined,
      },
    });
  }

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async toggle(userId: number, id: number) {
    const task = await this.findOne(userId, id);
    return this.prisma.task.update({
      where: { id },
      data: { done: !task.done },
    });
  }
}