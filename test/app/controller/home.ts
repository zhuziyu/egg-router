/**
 * Created by 清辉 on 2020/1/14 09:46
 */

import { Controller } from 'egg';
import { ApiDescription, ApiTitle, Body, Params, Post, Prefix, Query } from '../../../';
import { CreateHomeDto } from '../dto/create-home.dto';

@Prefix('/api/test')
export default class HomeController extends Controller {

  @Post('/params/:code')
  async testParams(@Body() body, @Query() query, @Params() params) {

    this.ctx.body = {
      body, query, params,
    };

  }

  @ApiTitle('1abc')
  @ApiDescription('2emm')
  @Post('/params/item/:code')
  async testParamsItem(@Body('code') body: CreateHomeDto, @Query('code') query, @Params('code') params) {

    this.ctx.body = {
      body, query, params,
    };

  }

}
