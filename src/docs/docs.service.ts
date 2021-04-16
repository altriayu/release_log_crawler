import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateDocDto } from "./create-doc.dto";
import { Doc, DocDocument } from "./docs.schema";


@Injectable()
export class DocsService {
  constructor(@InjectModel('docs') private DocModel: Model<DocDocument>) {}

  async getAllDocumentPathByType(type: string): Promise<Doc[]> {
    const res = await this.DocModel.find({type: type}).exec()
    return res
  }

  async addDocumentPath(newPath: CreateDocDto): Promise<Doc[]> {
    const res = await this.DocModel.create([newPath])
    return res
  }
}
