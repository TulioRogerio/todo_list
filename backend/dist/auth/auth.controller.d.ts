import { UsersService } from '../users/users.service';
import { ReportsService } from '../reports/reports.service';
export declare class AuthController {
    private userService;
    private reportService;
    constructor(userService: UsersService, reportService: ReportsService);
    getAllUsers(): import(".prisma/client").Prisma.PrismaPromise<{
        email: string;
        name: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    getReports(): {
        id: number;
        title: string;
    }[];
    getProfile(req: any): any;
}
