import { Controller, Get, Param } from '@nestjs/common';

@Controller('docs')
export class DocsController {
    constructor() {}
    @Get('/')
    getDocuments(@Param('type') type:string): string {
        return "所有文档"
    }
}
