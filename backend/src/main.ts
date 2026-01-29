// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();  // Habilita CORS para micro frontends
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,           // Remove campos não definidos no DTO
    forbidNonWhitelisted: false,
    transform: true,           // Transforma payloads em instâncias de DTO
  }));
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();