import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new Logger(),
    cors: true,
  });

  // config error message type
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 4400;

  await app.listen(port, '0.0.0.0', () => {
    new Logger('Application').log(
      `Service started successfully at port ${port} 🚀`,
    );
  });
}
bootstrap();
