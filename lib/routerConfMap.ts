/**
 * Created by 清辉 on 2020/1/9 18:32
 */

/**
 * 保存注解注入的路由以及中间件的配置
 */
export interface MapConf {
  router: RouterConf[];
  middleware: object;
}

/**
 * 路由配置的数据结构
 */
export interface RouterConf {
  property: string; // EggController的属性，也就是对应的处理函数
  method: string; // Http方法
  path: string; // Api 路径
}

/**
 * 用来保存路由的配置，数据结构如下
 * Key: EggController 的原型对象
 * Value: { router: [RouterConf], middleware: {[RouterConf.property]:[MiddlewareName]} }
 */
export const routerConfMap: Map<any, MapConf> = new Map();
