// src/auth/auth.controller.ts

import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles, Role } from '../auth/decorators/roles.decorator';
import { UsersService } from '../users/users.service';
import { ReportsService } from '../reports/reports.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)  // ⭐ Ambos os guards
@Controller('admin')
export class AuthController {

  constructor(
    private userService: UsersService,
    private reportService: ReportsService
  ) {}

  // Apenas ADMIN pode acessar
  @Roles(Role.ADMIN)
  @Get('users')
  getAllUsers() {
    return this.userService.findAll();
  }

  // ADMIN ou MANAGER podem acessar
  @Roles(Role.ADMIN, Role.MANAGER)
  @Get('reports')
  getReports() {
    return this.reportService.getAll();
  }

  // Qualquer usuário autenticado (sem @Roles)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}