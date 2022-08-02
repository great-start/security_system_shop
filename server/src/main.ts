import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (error) => {
        const errors = error.reduce((obj, err) => {
          return {
            ...obj,
            [err.property]: Object.values(err.constraints)[0],
          };
        }, {});
        return new BadRequestException([errors]);
      },
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'src', 'images'), {
    // index: false,
    prefix: '/src/images',
  });

  const config = new DocumentBuilder()
    .setTitle('Backend documentation')
    .setDescription('The store API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();

// export interface ValidationPipeOptions extends ValidatorOptions {
//   transform?: boolean;
//   disableErrorMessages?: true;
//   // exceptionFactory?: (errors: ValidationError[]) => any;
// }
