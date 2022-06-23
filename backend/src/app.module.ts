import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SdfModule } from './sdf/sdf.module';
import { SdfasdasdModule } from './sdfasdasd/sdfasdasd.module';

@Module({
  imports: [SdfModule, SdfasdasdModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
