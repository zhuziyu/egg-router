/**
 * Created by 清辉 on 2020/1/9 19:18
 */
import { Application, Context } from 'egg';
import loadController from '../util/loadController';
import { getRouterConf } from './decorators/httpMapping';
import { getPrefix } from './decorators/controllerPrefix';
import { getUseMiddleware } from './decorators/middleware';
import { getDefineParam } from './decorators/httpParam';

import { ScanFinish, Scanner } from '../apidoc/scanner';

function calculateParams(needParams, ctx: Context) {
  const params: any[] = Array(needParams.length);
  for (const { key, type, index } of needParams) {
    switch (type) {
      case 'body':
        params[index] = key ? ctx.request.body[key] : ctx.request.body;
        break;
      case 'query':
        params[index] = key ? ctx.request.query[key] : ctx.request.query;
        break;
      case 'params':
        params[index] = key ? ctx.params[key] : ctx.params;
        break;
      default:
        throw new Error(`no ${type} type`);
    }
  }

  if (!params.length) {
    params.push(ctx);
  }

  return params;
}

/**
 * 根据routerConfMap配置文件中的key -> controller原型对象的construct构造函数，创建controller的实例。
 * 返回一个中间件函数
 * @param Controller controller类
 * @param property 类的方法名
 * @param needParams 方法注解里面需要传入的参数
 */
function generatorRouterCallback(Controller, property, needParams) {


  return async (ctx: Context) => {

    const instance = new Controller(ctx);
    await instance[property](...calculateParams(needParams, ctx));

  };

}

/**
 * 计算需要挂载到路由层面的中间件
 * @param attachMiddleware 需要挂载的中间件名称列表
 * @param app application实例
 */
function calculateMiddleware(attachMiddleware: string[], app: Application): any[] {
  const middlewareList: any[] = [];

  for (const middlewareName of attachMiddleware) {
    if (!app.middleware[middlewareName]) {
      throw new Error(`middleware ${middlewareName} does not exist!`);
    }

    middlewareList.push(app.middleware[middlewareName](app.config[middlewareName], app));
  }

  return middlewareList;
}


export const RouterHandle = async (app: Application) => {

  const { router } = app;

  // 加载所有controller类
  const controllers = await loadController(app.config.baseDir);
  for (const controller of controllers) {


    const controllerPrefix = getPrefix(controller);
    app.logger.debug(`[${controller.name}-PREFIX]`, controllerPrefix);
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

      // TODO Developing
      Scanner(controller, key, routerConfig, needParams);

      app.logger.debug(`[${controller.name}-ROUTER-${key}]`, routerConfig);
      app.logger.debug(`[${controller.name}-MD-${key}]`, attachMiddleware);

      if (!routerConfig) {
        continue;
      }

      router[routerConfig.method](
        controllerPrefix + routerConfig.path, // router path
        ...calculateMiddleware(attachMiddleware, app), // router level middleware
        generatorRouterCallback(controller, key, needParams), // controller handle function
      );
    }
  }

  ScanFinish();
};
