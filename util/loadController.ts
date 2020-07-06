/**
 * Created by 清辉 on 2020/1/14 12:00
 */
import * as fs from 'fs';
import * as path from 'path';

export default function(baseDir: string) {

  let files = fs.readdirSync(path.join(baseDir, './app/controller'));
  files = files.map(file => {
    const fileAry = file.split('.');
    fileAry.pop();
    return fileAry.join('.');
  });
  const uniqFiles: string[] = [];
  files.forEach(file => {
    if (!uniqFiles.includes(file)) uniqFiles.push(file);
  });

  const controllers: any[] = [];

  for (const file of uniqFiles) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const exportObj = require(path.join(baseDir, './app/controller', file));
    controllers.push(exportObj.default);
  }
  return controllers;
}
