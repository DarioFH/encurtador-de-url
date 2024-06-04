import { Controller, Get, Post, Body, Param, Delete, Request, Put } from '@nestjs/common';
import { EncurtadorService } from './encurtador.service';
import { CreateEncurtadorDto } from './dto/create-encurtador.dto';
import { UpdateEncurtadorDto } from './dto/update-encurtador.dto';
import { Public } from 'src/auth/auth.public';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ResponseEncurtadorUrl } from './dto/response-encurtador-url.dto';

@ApiTags("Shortener")
@Controller('encurtador')
export class EncurtadorController {
  constructor(private readonly encurtadorService: EncurtadorService) {}

  @Post()
  @Public()
  @ApiOperation({summary: "Generate Short Url"})
  @ApiBody({type: CreateEncurtadorDto})
  @ApiResponse({status: 201, description: "Response with generated Url", schema: {type: 'string', example: 'http://localhost/XXXXXX'}})
  @ApiResponse({status: 400, description: "Não foi possível gerar a Url"})
  create(@Request() request, @Body() createEncurtadorDto: CreateEncurtadorDto) {

    return this.encurtadorService.create(!request['usuario']?0:request['usuario'].id,createEncurtadorDto);
  }

  @Get()
  @ApiOperation({summary: "List all Url's from the Authenticated user"})
  @ApiResponse({
    status: 201, 
    description: "Return all Url's from the user", 
    isArray: true,
    type: ResponseEncurtadorUrl
  })
  @ApiBearerAuth()
  async findAll(@Request() request) {
    return this.encurtadorService.findAll(request['usuario'].id);
  }

  @Get(':id')
  @ApiOperation({summary: "Show Url from the Authenticated user"})
  @ApiResponse({
    status: 201, 
    description: "Return Url from the user", 
    type: ResponseEncurtadorUrl
  })
  @ApiResponse({
    status: 400,
    description: "Url Not Found!"
  })
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.encurtadorService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({summary: "Update destiny Url"})
  @ApiBody({type: CreateEncurtadorDto})
  @ApiResponse({
    status: 201, 
    description: "Return Modified Url data", 
    type: ResponseEncurtadorUrl
  })
  @ApiResponse({
    status: 400,
    description: "Url Not Found!"
  })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateEncurtadorDto: UpdateEncurtadorDto) {
    return this.encurtadorService.update(id, updateEncurtadorDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Delete redirect Url"})
  @ApiResponse({
    status: 201,
    description: "Return the Url for the last time",
    type: ResponseEncurtadorUrl
  })
  @ApiResponse({
    status: 400,
    description: "Unable to remove url redirection"
  })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.encurtadorService.remove(id);
  }
}
