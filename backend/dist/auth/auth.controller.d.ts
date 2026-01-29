import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string;
        };
    }>;
    register(dto: RegisterDto): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            name: string;
        };
    }>;
    getProfile(req: any): any;
}
