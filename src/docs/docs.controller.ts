import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateDocDto } from './create-doc.dto';
import { Doc } from './docs.schema';
import { DocsService } from './docs.service';

@Controller('docs')
export class DocsController {
    constructor(private readonly docService: DocsService) {}

    @Get('/:type')
    async getAllDocumentsPathByType(@Param('type') type:string): Promise<Doc[]> {
        console.log('type:', type)
        const res = await this.docService.getAllDocumentPathByType(type)
        return res
    }

    @Post('/add')
    async addDocumentPath(@Body() body: CreateDocDto): Promise<Doc[]> {
        const res = await this.docService.addDocumentPath(body)
        return res
    }
}
