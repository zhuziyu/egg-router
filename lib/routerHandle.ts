/**
 * Created by 清辉 on 2020/1/9 19:18
 */
import { Application, Context } from 'egg';
import loadController from '../util/loadController';
import { httpMapKey, middlewareKey, prefixKey } from './metaKeys';

/**
 * 根据routerConfMap配置文件中的key -> controller原型对象的construct构造函数，创建controller的实例。
 * 返回一个中间件函数
 * @param Controller controller类
 * @param property 类的方法名
 */
function generatorRouterCallback(Controller, property) {

  return async (ctx: Context) => {

    const instance = new Controller(ctx);
    await instance[property](ctx);

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


export default async (app: Application) => {

  const { router } = app;

  // 加载所有controller类
  const controllers = await loadController(app.config.baseDir);
  for (const controller of controllers) {

    const controllerPrefix = Reflect.getMetadata(prefixKey, controller) || '';
    app.logger.debug(`[PREFIX-${controller.name}]`, controllerPrefix);
    // 遍历controller的所有成员
    for (const key in controller.prototype) {
      if (!controller.prototype.hasOwnProperty(key)) {
        continue;
      }
      if (typeof controller.prototype[key] !== 'function') {
        continue;
      }

      const attachMiddleware: string[] = Reflect.getMetadata(middlewareKey, controller.prototype, key) || [];
      const routerConfig = Reflect.getMetadata(httpMapKey, controller.prototype, key);

      app.logger.debug(`[ROUTER-${controller.name}-${key}]`, routerConfig);
      app.logger.debug(`[MD-${controller.name}-${key}]`, attachMiddleware);

      if (!routerConfig) {
        continue;
      }

      const middlewareList = calculateMiddleware(attachMiddleware, app);

      router[routerConfig.method](controllerPrefix + routerConfig.path, ...middlewareList, generatorRouterCallback(controller, key));
    }
  }
};
