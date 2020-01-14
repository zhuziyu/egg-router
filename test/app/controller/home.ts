/**
 * Created by 清辉 on 2020/1/14 09:46
 */

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
