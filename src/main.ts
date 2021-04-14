import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { generateHtml } from './utils/generateHTML.js'

// generateHtml('72', 'chrome')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000);
}
bootstrap()
