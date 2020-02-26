/**
 * Created by 清辉 on 2020/1/14 12:00
 */
import { promises as fs } from 'fs';
import * as path from 'path';

export default async function(baseDir: string) {

  let files = await fs.readdir(path.join(baseDir, './app/controller'));
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
    const exportObj = await import(path.join(baseDir, './app/controller', file));
    controllers.push(exportObj.default);
  }
  return controllers;
}
