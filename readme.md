[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/@zhuziyu/egg-router.svg?style=flat-square  
[npm-url]: https://www.npmjs.com/package/@zhuziyu/egg-router

egg router decorator -> 使用注解(decorator)定义API，简化路由配置。  

!! 注意： 本插件只支持typescript版本的egg项目，js版本的暂未测试

## 安装
```shell
npm i @zhuziyu/egg-router
```

## 使用方法
在`router`入口中注入
```typescript
// app/router.ts
import { Application } from 'egg';
import { RouterHandle } from '@zhuziyu/egg-router';

export default (app: Application) => {
  RouterHandle(app);
};

```

在`controller`中使用注解(decorator)
```typescript
// app/controller
import { Controller } from 'egg';
import { Get, Use, Prefix } from '@zhuziyu/egg-router';

@Prefix('/api')
export default class HomeController extends Controller {

  @Use([ 'middlewareName' ])  // 使用中间件。传入需要应用到该路由级别的中间件列表
  @Get('/') // 将该函数注册为path: /api ; method: GET 的api处理函数
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
}

// 完成，访问 `http://host:port/api` 即可
```
