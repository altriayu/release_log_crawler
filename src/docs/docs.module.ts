import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocsController } from './docs.controller';
import { DocSchema } from './docs.schema';
import { DocsService } from './docs.service';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'docs',
    schema: DocSchema,
    collection: 'path'
}])],
  controllers: [DocsController],
  providers:[DocsService]
})
export class DocsModule {}
