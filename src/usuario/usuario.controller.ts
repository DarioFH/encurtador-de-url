import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/auth.public';
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseAuthDto } from 'src/auth/dto/response-auth.dto';
import { ResponseCreateUserDto } from './dto/response-create-usuario.dto';


@Controller('usuario')
@ApiTags('User')
@UseGuards(AuthGuard)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Public()
  @Post()
  @ApiOperation({summary: "Create user"})
  @ApiBody({
    type: CreateUsuarioDto
  })
  @ApiResponse({
    status: 201,
    description: "User Created!",
    type: ResponseCreateUserDto
  })
  @ApiResponse({
    status: 400,
    description: "Unable to create user!"
  })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @ApiExcludeEndpoint()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({summary: "Update user"})
  @ApiBody({
    type: CreateUsuarioDto
  })
  @ApiResponse({
    status: 201,
    description: "Success to Update user",
    type: ResponseCreateUserDto
  })
  @ApiResponse({
    status: 400,
    description: "Unable to Update user"
  })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Delete user"})
  @ApiResponse({
    status: 201,
    description: "Return the user dor the last time",
    type: ResponseCreateUserDto
  })
  @ApiResponse({
    status: 400,
    description: "Unable to remove user"
  })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
