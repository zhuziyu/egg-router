/**
 * Created by 清辉 on 2020/1/9 19:00
 */
import 'reflect-metadata';

import { Get, Post, Put, Delete, Head, Options, Patch, All, Use } from './lib/httpMappingDecorator';
import { Prefix, getPrefix } from './lib/controllerClassDecorator';
import RouterHandle from './lib/routerHandle';

export {
  RouterHandle,
  Prefix,
  getPrefix,
  Use,
  Get,
  Post,
  Put,
  Delete,
  Head,
  Options,
  Patch,
  All,
};
