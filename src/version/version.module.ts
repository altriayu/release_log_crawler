import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { VersionController } from "./version.controller";
import { VersionSchema } from "./version.schema";
import { VersionService } from "./version.service";

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'version',
    schema: VersionSchema,
    collection: 'version'
  }])],
  controllers: [VersionController],
  providers: [VersionService]
})
export class VersionModule { }
