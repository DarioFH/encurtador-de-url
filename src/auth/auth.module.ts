import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UtilsModule } from 'src/utils/utils.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtConstants } from './jwt-constants.provider';
import { AuthGuard } from './auth.guard';

@Module({
  imports:[
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: {expiresIn: '600s'}
    }),
    UtilsModule,
    UsuarioModule,
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    {provide: 'APP_GUARD', useClass: AuthGuard}
  ]
})
export class AuthModule {}
