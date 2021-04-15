import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Version, VersionDocument } from "./version.schema";


@Injectable()
export class VersionService {
    constructor(@InjectModel('version') private VersionModel: Model<VersionDocument>) {}

    async getLatestVersion(type: string): Promise<string> {
        const item = (await this.VersionModel.findOne({type}).exec())
        if(item) {
            return item.latestVersion
        } else {
            return '错误'
        }
    }

    async updateLatestVersionByType(version: Version): Promise<Version> {
        const res =  await this.VersionModel.findOneAndUpdate({type: version.type}, version)
        return res
    }
}
