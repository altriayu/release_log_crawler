import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module'
import { join } from 'path';
import { generateHtml } from './utils/generateHTML.js'
import { updateDocument } from './utils/updateDocument';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets(join(__dirname, "..", "public"))
  await app.listen(3000);
}
bootstrap()
