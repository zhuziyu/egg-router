/**
 * Created by 清辉 on 2020/1/14 16:37
 */

import { Controller } from 'egg';
import { Get, Prefix, Use } from '../../../index';

@Prefix('/api/test')
export default class MiddlewareController extends Controller {


  @Get('/middleware')
  @Use([ 'hello' ])
  async check() {
    const { ctx } = this;
    ctx.body = ctx.attachMsg;
  }


}
