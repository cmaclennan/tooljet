import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { readdir, readFile, writeFile } from 'fs';
import { convertAppDefinitionFromSinglePageToMultiPage } from '../lib/single-page-to-and-from-multipage-definition-conversion';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  readdir('/Users/sherfin/code/ToolJet/server/templates', function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    for (const file of files) {
      console.log({ file });
      readFile('/Users/sherfin/code/ToolJet/server/templates/' + file + '/definition.json', 'utf8', (err, data) => {
        console.log({ err });
        if (!err) {
          const appData = JSON.parse(data);
          const newAppData = {
            ...appData,
            appVersions: appData.appVersions?.map(convertAppDefinitionFromSinglePageToMultiPage),
            editingVersion: convertAppDefinitionFromSinglePageToMultiPage(appData.editingVersion),
          };

          writeFile(
            '/Users/sherfin/code/ToolJet/server/templates/' + file + '/definition.json',
            JSON.stringify(newAppData),
            'utf8',
            console.log
          );
          console.log({ dhadh: newAppData.editingVersion });
        }
      });
    }
  });

  await app.close();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
