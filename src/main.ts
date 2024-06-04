import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API Shorter URL')
    .setDescription("Uma API para encurtar URL's")
    .setVersion("1.0")
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document)


  app.enableCors();
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }
  ))
  await app.listen(parseInt(process.env.PORT));
}
bootstrap();
