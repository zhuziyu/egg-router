/**
 * Created by 清辉 on 2020/1/9 19:18
 */
import { Application, Context } from 'egg';
import { routerConfMap } from './routerConfMap';
import { getPrefix } from './controllerClassDecorator';

/**
 * 根据routerConfMap配置文件中的key -> controller原型对象的construct构造函数，创建controller的实例。
 * 返回一个中间件函数
 * @param constructor controller类构造函数
 * @param property 类的方法名
 */
function generatorRouterCallback(constructor, property) {

  return async (ctx: Context) => {

    const instance = new constructor(ctx);
    await instance[property](ctx);

  };

}

export default (app: Application) => {

  const { router } = app;

  // 遍历路由配置文件，获取我们保存的配置
  routerConfMap.forEach((mapConf, target) => {

    for (const { property, method, path } of mapConf.router) {

      const prefix = getPrefix(target.constructor);

      // 获取注解定义好的中间件列表
      const middlewareList: any[] = [];
      const mdNameList = mapConf.middleware[property];
      if (Array.isArray(mdNameList)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore 把app作为中间件工厂函数的参数传入，供中间件使用
        mdNameList.forEach(mdName => middlewareList.push(app.middleware[mdName](app.config[mdName], app)));
      }

      // 在router上面，挂载中间件函数，让目标的注解函数生效
      router[method](prefix + path, ...middlewareList, generatorRouterCallback(target.constructor, property));

    }

  });
};
