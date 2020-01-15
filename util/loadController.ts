/**
 * Created by 清辉 on 2020/1/14 12:00
 */
import { promises as fs } from 'fs';
import * as path from 'path';

export default async function(baseDir: string) {
  const files = await fs.readdir(path.join(baseDir, './app/controller'));
  const controllers: any[] = [];
  for (const file of files) {
    const exportObj = await import(path.join(baseDir, './app/controller', file));
    controllers.push(exportObj.default);
  }
  return controllers;
}
