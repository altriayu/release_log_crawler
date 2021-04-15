import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Query, UpdateWriteOpResult } from "mongoose";
import { Version, VersionDocument } from "./version.schema";
import to from 'await-to-js'

@Injectable()
export class VersionService {
    constructor(@InjectModel('version') private VersionModel: Model<VersionDocument>) {}

    async getLatestVersion(type: string): Promise<string> {
        let err, item: Version
        [err, item] = await to(this.VersionModel.findOne({type}).exec())
        if(err) {
            console.log('查询失败')
        } else {
            return item.latestVersion
        }
    }

    async updateLatestVersionByType(version: Version) {
        const res = await this.VersionModel.updateOne({type: version.type}, version, {new:true}) 
        console.log('res', res)
        return res
    }
}
