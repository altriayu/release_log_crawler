import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

@Schema()
export class Version {
    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    latestVersion: string;
}

export type VersionDocument = Version & Document
export const VersionSchema = SchemaFactory.createForClass(Version)
