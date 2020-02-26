/**
 * Created by 清辉 on 2020/1/16 18:56
 */
import { IRouterConf } from '../lib/decorators/httpMapping';
import { IHttpParam } from '../lib/decorators/httpParam';
import { DesignParamTypes } from '../lib/metaKeys';
import { getPrefix } from '../lib/decorators/controllerPrefix';
import { getProperties } from './ObjectPropertyStore';
import { getApiDescription, getApiSuccessExample, getApiTitle } from './decorators/api';

const apiDescTmpl = `
/**
 * @api {get} /user/:id 上传大文件之后
 * @apiName CheckUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */
 `;

function FirstWordUpperCase(word: string): string {
  return word.substring(0, 1)
    .toUpperCase() + word.substring(1);
}

const allApiData: any[] = [];

export const Scanner = (target: any, propertyKey: string, routerConf: IRouterConf, needParams: IHttpParam[]) => {


  const apiPath = getPrefix(target) + routerConf.path;
  const apiMethod = FirstWordUpperCase(routerConf.method);
  const apiName = apiMethod + FirstWordUpperCase(propertyKey);
  const apiTitle = getApiTitle(target.prototype, propertyKey);
  const apiDescription = getApiDescription(target.prototype, propertyKey);
  const apiSuccessExample = getApiSuccessExample(target.prototype, propertyKey);
  // TODO modify apiTitle

  const apiGroup = target.name.replace('Controller', '');

  const apiData: any = {
    apiMethod, apiPath, apiTitle,
    apiName,
    apiGroup,
    apiDescription,
    apiParamParams: [],
    apiParamQuery: [],
    apiParamBody: [],
    apiSuccessExample,
  };


  const paramsType = Reflect.getMetadata(DesignParamTypes, target.prototype, propertyKey);

  for (const needParam of needParams) {
    const dto = paramsType[needParam.index];
    const dtoTypes = getProperties(dto.prototype);

    switch (needParam.type) {
      case 'query':
        apiData.apiParamQuery = dtoTypes;
        break;
      case 'body':
        apiData.apiParamBody = dtoTypes;
        break;
      case 'params':
        apiData.apiParamParams = dtoTypes;
        break;
      default:
        throw new Error(`no this type: ${needParam.type}`);

    }
  }

  allApiData.push(apiData);

};

export const ScanFinish = () => {
  // console.log(JSON.stringify(allApiData));
};
