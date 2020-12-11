[![NPM version][npm-image]][npm-url] [![Build Status][travis-img]][travis-url]

[npm-image]: https://img.shields.io/npm/v/egg-router-util.svg?style=flat-square  
[npm-url]: https://www.npmjs.com/package/egg-router-util

[travis-img]: https://api.travis-ci.com/zhuziyu/egg-router.svg?branch=master
[travis-url]: https://travis-ci.com/zhuziyu/egg-router


🥚 egg router decorator util -> simple way to define api router

!! Warning： this package only support typescript.

## Install
```shell
npm i egg-router-util
```

## Usage
在`router`入口中接管路由处理函数
```typescript
// app/router.ts
import { Application } from 'egg';
import { RouterHandle } from 'egg-router-util';

export default (app: Application) => {
  RouterHandle(app);
};

```

在`controller`中使用注解(decorator)
```typescript
// app/controller
import { Controller } from 'egg';
import { All, Body, Get, Params, Prefix, Query, Use } from 'egg-router-util';

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


// done 
```
