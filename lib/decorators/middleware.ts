/**
 * Created by 清辉 on 2020/1/14 12:59
 */
import { middlewareKey } from '../metaKeys';

export function getUseMiddleware(target: any, propertyKey: string): string[] {
  return Reflect.getMetadata(middlewareKey, target, propertyKey) || [];
}

export function Use(middleware: string[]) {

  return (target: any, property: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(middlewareKey, middleware, target, property);
    descriptor.enumerable = true;
  };

}
