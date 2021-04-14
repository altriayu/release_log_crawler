import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { Version } from "./version.schema";
import { VersionService } from "./version.service";


@Controller('version')
export class VersionController {
    constructor(private readonly versionService: VersionService) {}

    @Get('/:type')
    async getDocumentLatestVersion(@Param('type') type:string): Promise<string> {
        const res = await this.versionService.getLatestVersion(type)
        return res
    }

    @Post('/update')
    async updateLatestVersionByType(@Body() body: Version) {
        const res = await this.versionService.updateLatestVersionByType(body)
        if(res) {
            return "更新版本成功！"
        }
        return "更新版本失败！"
    }
}