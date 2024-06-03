import { Module } from '@nestjs/common';
import { EncurtadorService } from './encurtador.service';
import { EncurtadorController } from './encurtador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encurtador } from './entities/encurtador.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Encurtador]),
    UsuarioModule
  ],
  controllers: [EncurtadorController],
  providers: [EncurtadorService],
  exports: [
    EncurtadorService
  ]
})
export class EncurtadorModule {}
