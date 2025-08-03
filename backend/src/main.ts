import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

 // 🛡️ Configurar CORS con FRONTEND_URL desde .env
 const allowedOrigin = process.env.FRONTEND_URL;
 
 console.log('CORS Origin:', process.env.FRONTEND_URL);

 app.enableCors({
   origin: allowedOrigin,
   credentials: true,
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
 });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('GesPack API')
    .setDescription('API de conexión a la DB de GesPack')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // Cambiamos la ruta a 'api-docs' para evitar conflictos
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 5000;
  await app.listen(port, '0.0.0.0');
  console.log(`App is running on: http://localhost:${port}`);
}

bootstrap();
