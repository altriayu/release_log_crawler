import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

@Schema()
export class Doc {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  version: string;

  @Prop({ required: true })
  path: string;
}

export type DocDocument = Doc & Document
export const DocSchema = SchemaFactory.createForClass(Doc)
