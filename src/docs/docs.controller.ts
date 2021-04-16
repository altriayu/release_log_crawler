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

  @Get('/:name')
  async getAllDocumentsPathByName(@Param('name') name: string) {
    const [err, res] = await to(this.docService.getAllDocumentPathByName(name))
    if (res) {
      this.resultFormat.success(res)
    } else {
      return this.resultFormat.error("9999", "ERROR")
    }
  }

  @Post('/add')
  async addDocumentPath(@Body() body: CreateDocDto) {
    const [err, res] = await to(this.docService.addDocumentPath(body))
    if (res) {
      this.resultFormat.success(res)
    } else {
      return this.resultFormat.error("9999", "ERROR")
    }
  }
}
