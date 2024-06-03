import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtConstants } from "./jwt-constants.provider";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./auth.public";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly jwtConstants: JwtConstants,
        private readonly reflector: Reflector
    ){}

    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        
        if(isPublic){
            if(!token) {
                request['usuario'] = null
                return true
            }
            
            try {
                const payload = await this.jwtService.verifyAsync(token, {secret: this.jwtConstants.secret});
                request['usuario'] = payload
            } catch (error) {
                request['usuario'] = null
            }
            return true
        }
        
        if(!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {secret: this.jwtConstants.secret });
            request['usuario'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true
    }


    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}