/**
 * Created by 清辉 on 2020/1/14 12:27
 */
import { httpMapKey } from '../metaKeys';

/**
 * 定义常用的HTTP方法
 */
const HttpMethod = {
  Get: 'get', Post: 'post', Put: 'put', Delete: 'delete',
  Head: 'head', Options: 'options', Patch: 'patch', All: 'all',
};

/**
 * 传入装饰器工厂的参数类型
 */
interface HandlerMetaData {
  path: string;
  method: string;
}


/**
 * 定义一个装饰器工厂函数，返回一个用来装饰Controller类的方法装饰器
 * @param config {path,method}
 */
function mappingRequest(config: HandlerMetaData) {

  return (target: any, property: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(httpMapKey, config, target, property);
    descriptor.enumerable = true;
  };

}

export function Get(path: string) {
  return mappingRequest({ path, method: HttpMethod.Get });
}

export function Post(path: string) {
  return mappingRequest({ path, method: HttpMethod.Post });
}

export function Put(path: string) {
  return mappingRequest({ path, method: HttpMethod.Put });
}

export function Delete(path: string) {
  return mappingRequest({ path, method: HttpMethod.Delete });
}

export function Head(path: string) {
  return mappingRequest({ path, method: HttpMethod.Head });
}

export function Options(path: string) {
  return mappingRequest({ path, method: HttpMethod.Options });
}

export function Patch(path: string) {
  return mappingRequest({ path, method: HttpMethod.Patch });
}

export function All(path: string) {
  return mappingRequest({ path, method: HttpMethod.All });
}
