/**
 * Created by 清辉 on 2020/1/9 19:39
 */
const prefixKey = Symbol('Decorator#Prefix');

export function Prefix(prefix: string) {
  return function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata(prefixKey, prefix, constructor);
    return constructor;
  };
}

export function getPrefix(constructor): string {
  return Reflect.getMetadata(prefixKey, constructor) || '';
}
