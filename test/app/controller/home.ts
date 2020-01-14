/**
 * Created by 清辉 on 2020/1/14 09:46
 */

import { Controller } from 'egg';
import { Get, Prefix, Use } from '../../../';

@Prefix('/api')
export default class HomeController extends Controller {

  @Use([ 'hello' ])
  @Get('/:id')
  async index() {
    this.ctx.body = 'Hello World!';
  }

}
