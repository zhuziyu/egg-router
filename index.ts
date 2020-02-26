/**
 * Created by 清辉 on 2020/1/9 19:00
 */
import 'reflect-metadata';

import { Get, Post, Put, Delete, Head, Options, Patch, All } from './lib/decorators/httpMapping';
import { Body, Query, Params } from './lib/decorators/httpParam';
import { Use } from './lib/decorators/middleware';
import { Prefix } from './lib/decorators/controllerPrefix';
import { RouterHandle } from './lib/routerHandle';

import { ApiOptionProperty, ApiProperty } from './apidoc/decorators/api-property';
import { ApiDescription, ApiTitle, ApiSuccessExample } from './apidoc/decorators/api';

export {
  RouterHandle,
  Prefix,
  Use,
  Get, Post, Put, Delete, Head, Options, Patch, All,
  Body, Query, Params,
  ApiOptionProperty, ApiProperty,
  ApiDescription, ApiTitle, ApiSuccessExample,
};
