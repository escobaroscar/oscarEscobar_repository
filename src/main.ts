import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  //TODO:Add global validations 
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
  })),
   
  await app.listen(process.env.PORT||3000);
  console.log(`Server listening on port: ${await app.getUrl()}`);

}
bootstrap();
