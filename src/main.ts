import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module'
import { join } from 'path';
import * as cors from 'cors';
import { autoUpdatelogs } from './autoCrawler';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets(join(__dirname, '..', 'public'),{
    prefix: '/'
  })
  await app.listen(3005);
}
bootstrap().then(() => {
  setInterval(() => {
    autoUpdatelogs()
  }, 1000 * 60 * 60 * 24)
})