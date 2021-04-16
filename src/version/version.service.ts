import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Query, UpdateWriteOpResult } from "mongoose";
import { Version, VersionDocument } from "./version.schema";
import to from 'await-to-js'

@Injectable()
export class VersionService {
  constructor(@InjectModel('version') private VersionModel: Model<VersionDocument>) { }

  async getLatestVersion(name: string): Promise<string> {
    let err, item: Version
    [err, item] = await to(this.VersionModel.findOne({ name }).exec())
    if (err) {
      console.log('查询失败')
    } else {
      return item.latestVersion
    }
  }

  async updateLatestVersionByName(version: Version) {
    const res = await this.VersionModel.updateOne({ name: version.name }, version, { new: true })
    console.log('res', res)
    return res
  }
}
