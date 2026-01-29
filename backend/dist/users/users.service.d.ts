import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        email: string;
        name: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
}
