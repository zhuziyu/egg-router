/**
 * Created by 清辉 on 2020/1/9 19:39
 */
import { prefixKey } from '../metaKeys';

export function Prefix(prefix: string) {
  return function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata(prefixKey, prefix, constructor);
    return constructor;
  };
}
