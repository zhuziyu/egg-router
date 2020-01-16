/**
 * Created by 清辉 on 2020/1/16 18:56
 */
import { IRouterConf } from '../lib/decorators/httpMapping';
import { IHttpParam } from '../lib/decorators/httpParam';
import { DesignParamTypes } from '../lib/metaKeys';

export const Scanner = (target: any, propertyKey: string, routerConf: IRouterConf, needParams: IHttpParam[]) => {

  console.log(routerConf);
  console.log(needParams);

  console.log('params type ============', Reflect.getMetadata(DesignParamTypes, target.prototype, propertyKey));

};
