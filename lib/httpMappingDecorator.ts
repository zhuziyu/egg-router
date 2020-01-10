/**
 * Created by 清辉 on 2020/1/9 18:16
 */
import { routerConfMap, MapConf, RouterConf } from './routerConfMap';

/**
 * 定义常用的HTTP方法
 */
const HttpMethod = {
  Get: 'get', Post: 'post', Put: 'put', Delete: 'delete',
  Head: 'head', Options: 'options', Patch: 'patch', All: 'all',
};

/**
 * 定义一个简单的函数，用来将装饰获得的属性，存入routerConfMap中
 * @param targetMap routerConfMap 保存路由配置的map -> routerConfMap
 * @param mapKey map key
 * @param mapValue map value
 */
function defineRouter(targetMap: Map<any, MapConf>, mapKey: any, mapValue: RouterConf) {

  let mapConf = targetMap.get(mapKey);
  if (!mapConf) {
    mapConf = { router: [], middleware: {} };
    targetMap.set(mapKey, mapConf);
  }

  mapConf.router.push(mapValue);
}

function defineMiddleware(targetMap: Map<any, MapConf>, key: any, property: string, value: string[]) {
  let mapConf = targetMap.get(key);
  if (!mapConf) {
    mapConf = { router: [], middleware: {} };
    targetMap.set(key, mapConf);
  }

  mapConf.middleware[property] = value;
}

/**
 * 传入装饰器工厂的参数类型
 */
interface HandlerMetaData {
  path: string;
  method: string;
}

/**
 * 定义一个装饰器工厂函数，返回一个用来装饰Controller类的方法装饰器
 * @param handlerMetadata {path,method}
 */
function mappingRequest({ path, method }: HandlerMetaData) {

  return (target: any, property: string, descriptor: PropertyDescriptor) => {
    defineRouter(routerConfMap, target, { property, path, method });
    return descriptor;
  };

}

export function Use(middleware: string[]) {

  return (target: any, property: string, descriptor: PropertyDescriptor) => {
    defineMiddleware(routerConfMap, target, property, middleware);
    return descriptor;
  };

}

/**
 * 目标装饰器，可以用来添加到controller的方法上面。用法：@Get("/example/path")
 * @param path 路由路径
 */
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
