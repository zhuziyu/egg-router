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
import { All, Body, Get, Params, Prefix, Query, Use } from '../../../';

@Prefix('/api')
export default class HomeController extends Controller {

  @Use([ 'hello' ])
  @All('/:id')
  async index(@Body('title')body, @Query('code')query, @Params('id')params) {

    this.ctx.logger.debug(body, query, params);

    this.ctx.body = 'Hello World!';
  }

  @Get('/test/:id')
  async test(ctx) {
    this.ctx.logger.info(ctx);
    this.ctx.body = 'YES';
  }

}


// 完成，访问 `http://host:port/api/:id` 即可
```
