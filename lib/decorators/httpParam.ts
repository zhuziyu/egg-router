/**
 * Created by 清辉 on 2020/1/14 14:09
 */
import { paramKey } from '../metaKeys';

export interface IHttpParam {
  key: string | undefined;
  type: string;
  index: number;
}

function AllParam(type: string, key?: string) {

  return (target: any, propertyKey: string, paramIndex: number) => {
    const existParams: IHttpParam[] = Reflect.getOwnMetadata(paramKey, target, propertyKey) || [];

    existParams.push({ key, type, index: paramIndex });

    Reflect.defineMetadata(paramKey, existParams, target, propertyKey);
  };

}

export function Query(key?: string) {
  return AllParam('query', key);
}

export function Body(key?: string) {
  return AllParam('body', key);
}

export function Params(key?: string) {
  return AllParam('params', key);
}

export function getDefineParam(target: any, propertyKey: string): IHttpParam[] {
  return Reflect.getOwnMetadata(paramKey, target, propertyKey) || [];
}
