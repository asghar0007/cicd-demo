import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS so the Next.js frontend can make requests to this API
  app.enableCors(); 
  
  // Render provides the PORT environment variable. Fallback to 3001 locally.
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
