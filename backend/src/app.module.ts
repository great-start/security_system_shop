import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeModule } from './type/type.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ProductModule,
    TypeModule,
    CategoryModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'src', 'images'),
    //   serveRoot: join(__dirname, '..', 'src', 'images'),
    //   serveStaticOptions: {
    //     index: false,
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
