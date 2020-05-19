/**
 * Created by 清辉 on 2020/1/9 19:18
 */
import loadController from '../util/loadController';
import { getRouterConf } from './decorators/httpMapping';
import { getPrefix } from './decorators/controllerPrefix';
import { getUseMiddleware } from './decorators/middleware';
import { getPermission } from './decorators/permission';
// import { getDefineParam } from './decorators/httpParam';
import * as KoaRouter from '@koa/router';
import * as Koa from 'koa';

const router = new KoaRouter();

interface RouterHandleOptions {
  controllerDir: string;
  app: Koa;
  useMiddleware?: any[];
  logging?: (...args) => void;
  permissionMiddleware?: (permission) => ((ctx, next) => void);
  permissionList?: any[];
}

// controllerDir: string, app: Koa, useMiddleware: any[] = [], logging: ((...args) => void) = console.debug
export const RouterHandle = ({
  controllerDir,
  app,
  useMiddleware = [],
  logging = console.debug,
  permissionMiddleware,
  permissionList,
}: RouterHandleOptions) => {

  if (Array.isArray(useMiddleware)) {
    router.use(...useMiddleware);
    logging(`[HTTP Maping] [Global Middleware] ${useMiddleware.map(i => i.name).join(',')}`);
  }

  // 加载所有controller类
  const controllers = loadController(controllerDir);
  for (const controller of controllers) {


    // controller 实例
    const ci = new controller();

    const controllerPrefix = getPrefix(controller);
    // logging(`[${controller.name}-PREFIX]`, controllerPrefix);
    // 遍历controller的所有成员
    for (const key in controller.prototype) {
      if (!controller.prototype.hasOwnProperty(key)) {
        continue;
      }
      if (typeof controller.prototype[key] !== 'function') {
        continue;
      }

      const attachMiddleware: any[] = getUseMiddleware(controller.prototype, key);
      const routerConfig = getRouterConf(controller.prototype, key);
      const routerPermission = getPermission(controller.prototype, key);
      // const needParams = getDefineParam(controller.prototype, key);

      // logging(`[${controller.name}-ROUTER-${key}]`, routerConfig);
      // logging(`[${controller.name}-MD-${key}]`, attachMiddleware.map(i => i.name).join(','));
      // logging(`[${controller.name}-PM-${key}]`, routerPermission);

      if (!routerConfig) {
        continue;
      }
      const { method, path: apiPath } = routerConfig;
      const apiFullPath = controllerPrefix + apiPath;

      if (routerPermission && routerPermission.roles) {
        if (typeof permissionMiddleware !== 'function') {
          return logging('[RouterMapping] [WARNING] 权限验证的中间件配置有误，请检查');
        }

        attachMiddleware.unshift(permissionMiddleware(routerPermission.roles));


        if (!permissionList) continue;

        const { roles, name, group = controller.name, groupName } = routerPermission;

        permissionList.push({ roles, name: name || roles, group, api: apiFullPath, groupName: groupName || group });
      }

      router[method](
        apiFullPath,
        ...attachMiddleware,
        ci[key],
      );

      const printObj = JSON.stringify({
        Method: method,
        Path: apiFullPath,
        Middlewares: attachMiddleware.map(i => i.name).join(','),
        Permission: (routerPermission && routerPermission.name) || 'none',
      });
      logging('[RouterMapping]', printObj);

      // logging(`[Maping] [MW: ${attachMiddleware.map(i => i.name).join(',')}] [${method}]  [${controllerPrefix + apiPath}]`);

      app.use(router.routes());

    }
  }

};
