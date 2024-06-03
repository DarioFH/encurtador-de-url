import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { EncryptUtils } from 'src/utils/encrypt-utils.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UtilsModule } from 'src/utils/utils.module';
import { JwtConstants } from 'src/auth/jwt-constants.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario
    ]),
    UtilsModule,
  ],
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    JwtConstants,
  ],
  exports: [
    JwtConstants,
    UsuarioService,
  ]
})
export class UsuarioModule {}
