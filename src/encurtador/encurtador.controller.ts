import { Controller, Get, Post, Body, Param, Delete, Request, Put } from '@nestjs/common';
import { EncurtadorService } from './encurtador.service';
import { CreateEncurtadorDto } from './dto/create-encurtador.dto';
import { UpdateEncurtadorDto } from './dto/update-encurtador.dto';
import { Public } from 'src/auth/auth.public';

@Controller('encurtador')
export class EncurtadorController {
  constructor(private readonly encurtadorService: EncurtadorService) {}

  @Post()
  @Public()
  create(@Request() request, @Body() createEncurtadorDto: CreateEncurtadorDto) {

    return this.encurtadorService.create(!request['usuario']?0:request['usuario'].id,createEncurtadorDto);
  }

  @Get()
  findAll(@Request() request) {
    return this.encurtadorService.findAll(request['usuario'].id);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.encurtadorService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEncurtadorDto: UpdateEncurtadorDto) {
    return this.encurtadorService.update(id, updateEncurtadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.encurtadorService.remove(id);
  }
}
