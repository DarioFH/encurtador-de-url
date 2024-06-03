import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { EncryptUtils } from 'src/utils/encrypt-utils.providers';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usuarioService: UsuarioService,
    ){}

    async login(loginData: LoginAuthDto): Promise<any> {

        try {
            
            const u = await this.usuarioService.auth(loginData.email, loginData.senha)
            const payload = {id: u.id, nome: u.nome, email: u.email}
            
            return {
                ...payload,
                access_token: await this.jwtService.signAsync(payload)
            }
        } catch (error) {
            throw new HttpException({
                status: 400,
                error: error.message
            },HttpStatus.BAD_REQUEST)
        }
        
    }
}
