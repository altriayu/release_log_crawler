import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import to from "await-to-js";
import { ResultFormat } from "src/utils/resultFormatter/resultUtils";
import { Version } from "./version.schema";
import { VersionService } from "./version.service";


@Controller('version')
export class VersionController {
  private resultFormat
  constructor(private readonly versionService: VersionService) {
    this.resultFormat = new ResultFormat()
  }

  @Get('/:name')
  async getDocumentLatestVersion(@Param('name') name: string) {
    let err, res
    [err, res] = await to(this.versionService.getLatestVersion(name))
    if (res) {
      return this.resultFormat.success({ latestVersion: res })
    } else {
      return this.resultFormat.error("查询失败", "ERROR")
    }
  }

  @Post('/update')
  async updateLatestVersionByName(@Body() body: Version) {
    let err, res
    [err, res] = await to(this.versionService.updateLatestVersionByName(body))
    if (res) {
      return this.resultFormat.success()
    } else {
      return this.resultFormat.error("9999", "ERROR")
    }
  }
}
