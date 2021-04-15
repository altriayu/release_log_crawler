import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResultFormat } from 'src/utils/resultFormatter/resultUtils';
import { CreateDocDto } from './create-doc.dto';
import { Doc } from './docs.schema';
import { DocsService } from './docs.service';

@Controller('docs')
export class DocsController {
    constructor(private readonly docService: DocsService) {}

    @Get('/:type')
    async getAllDocumentsPathByType(@Param('type') type:string) {
        console.log('type:', type)
        const res = await this.docService.getAllDocumentPathByType(type)
        return new ResultFormat<Doc[]>(res).success()
    }

    @Post('/add')
    async addDocumentPath(@Body() body: CreateDocDto) {
        const res = await this.docService.addDocumentPath(body)
        return new ResultFormat<null>().success()
    }
}
