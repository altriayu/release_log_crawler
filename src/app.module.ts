import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocsModule } from './docs/docs.module';
import { VersionModule } from './version/version.module';

@Module({
  imports: [DocsModule,VersionModule, MongooseModule.forRoot('mongodb://docs:docsPWD@10.0.0.1:27017/docs?authSource=docs&readPreference=primary&appname=MongoDB%20Compass&ssl=false')],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
