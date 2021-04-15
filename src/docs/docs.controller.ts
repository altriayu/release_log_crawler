import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResultFormat } from 'src/utils/resultFormatter/resultUtils';
import { CreateDocDto } from './create-doc.dto';
import { Doc } from './docs.schema';
import { DocsService } from './docs.service';
import to from 'await-to-js'

@Controller('docs')
export class DocsController {
    private resultFormat
    constructor(private readonly docService: DocsService) {
        this.resultFormat = new ResultFormat()
    }

    @Get('/:type')
    async getAllDocumentsPathByType(@Param('type') type:string) {
        const [err, res] = await to(this.docService.getAllDocumentPathByType(type))
        if(res) {
            this.resultFormat.success(res)
        } else {
            return this.resultFormat.error("9999", "ERROR")
        }
    }

    @Post('/add')
    async addDocumentPath(@Body() body: CreateDocDto) {
        const [err, res] = await to(this.docService.addDocumentPath(body))
        if(res) {
            this.resultFormat.success(res)
        } else {
            return this.resultFormat.error("9999", "ERROR")
        }
    }
}
