import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocsModule } from './docs/docs.module';
import { VersionModule } from './version/version.module';

const mongoUrl:string = 'mongodb://docs:docsPWD@39.108.137.215:27017/docs?authSource=docs'
@Module({
  imports: [DocsModule,VersionModule, MongooseModule.forRoot(mongoUrl)],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
