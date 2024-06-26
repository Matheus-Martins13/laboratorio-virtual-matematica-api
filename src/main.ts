import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Task Api - TypeORM')
    .setDescription(
      `O projeto Task API - TypeORM é um projeto de composição de portifólio. 
      Se trata de uma API básica desenvolvida em Nestjs com recursos de segurança e
      autenticação. O projeto utiliza o TypeORM.`,
    )
    .setVersion('1.0')
    .addTag('users')
    .addTag('task')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
