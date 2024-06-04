import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from './auth.public';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseAuthDto } from './dto/response-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @ApiOperation({summary: 'Auth user'})
  @ApiBody({type: LoginAuthDto})
  @ApiResponse({status: 201, description: 'Response with Access Token', type: ResponseAuthDto })
  @ApiResponse({status: 400, description: "Usuário não localizado!"})
  async login(@Body() data:LoginAuthDto) {
    return this.authService.login(data)
  }

}
