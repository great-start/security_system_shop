import { Module } from '@nestjs/common';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeModule } from './type/type.module';
import { CategoryModule } from './category/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ProductModule,
    TypeModule,
    CategoryModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'images'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
