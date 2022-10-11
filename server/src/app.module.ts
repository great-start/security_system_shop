import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeModule } from './type/type.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CurrencyModule } from './currency/currency.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    ProductModule,
    TypeModule,
    CategoryModule,
    AuthModule,
    UserModule,
    CurrencyModule,
    AdminModule,
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
