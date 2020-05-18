/**
 * Created by 清辉 on 2020/1/9 19:18
 */
import loadController from '../util/loadController';
import { getRouterConf } from './decorators/httpMapping';
import { getPrefix } from './decorators/controllerPrefix';
import { getUseMiddleware } from './decorators/middleware';
import { getDefineParam } from './decorators/httpParam';
import * as KoaRouter from '@koa/router';
import * as Koa from 'koa';

const router = new KoaRouter();


export const RouterHandle = (controllerDir: string, app: Koa, middlewares: any, logging = console.log) => {

  // 加载所有controller类
  const controllers = loadController(controllerDir);
  for (const controller of controllers) {


    // controller 实例
    const ci = new controller();

    const controllerPrefix = getPrefix(controller);
    logging(`[${controller.name}-PREFIX]`, controllerPrefix);
    // 遍历controller的所有成员
    for (const key in controller.prototype) {
      if (!controller.prototype.hasOwnProperty(key)) {
        continue;
      }
      if (typeof controller.prototype[key] !== 'function') {
        continue;
      }

      const attachMiddleware: string[] = getUseMiddleware(controller.prototype, key);
      const routerConfig = getRouterConf(controller.prototype, key);
      const needParams = getDefineParam(controller.prototype, key);

      logging(`[${controller.name}-ROUTER-${key}]`, routerConfig);
      logging(`[${controller.name}-MD-${key}]`, attachMiddleware);
      logging(`[${controller.name}-PA-${key}]`, needParams);

      if (!routerConfig) {
        continue;
      }

      router[routerConfig.method](
        controllerPrefix + routerConfig.path,
        ...attachMiddleware.map(i => middlewares[i]),
        ci[key],
      );

      app.use(router.routes());

    }
  }

};
