import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { ResultFormat } from "src/utils/resultFormatter/resultUtils";
import { Version } from "./version.schema";
import { VersionService } from "./version.service";


@Controller('version')
export class VersionController {

    constructor(private readonly versionService: VersionService) {}

    @Get('/:type')
    async getDocumentLatestVersion(@Param('type') type:string): Promise<any> {
        const res = await this.versionService.getLatestVersion(type)
        console.log(res)
        return new ResultFormat<object>({version: res}).success()
    }

    @Post('/update')
    async updateLatestVersionByType(@Body() body: Version) {
        const res = await this.versionService.updateLatestVersionByType(body)
        return new ResultFormat<null>().success()
    }
}
