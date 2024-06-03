import { Module } from '@nestjs/common';
import { EncurtadorModule } from './encurtador/encurtador.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { RedirectModule } from './redirect/redirect.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //subscribers: ['project1/*.subscriber.ts'],
      //migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      //migrationsTableName: 'migrations'
    }),
    EncurtadorModule,
    UsuarioModule,
    AuthModule,
    RedirectModule
  ],
  controllers: [

  ],
  providers: [
    
  ],
})
export class AppModule {}
