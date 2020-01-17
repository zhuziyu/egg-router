/**
 * Created by 清辉 on 2020/1/17 18:14
 */

export const apiTitleKey = Symbol('apiDoc#title');
export const apiDescriptionKey = Symbol('apiDoc#description');
export const apiSuccessExampleKey = Symbol('apiDoc#SuccessExampl');

export const ApiTitle = (title: string) =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(apiTitleKey, title, target, propertyKey);
  };
export const getApiTitle = (target: any, propertyKey: string): string => Reflect.getMetadata(apiTitleKey, target, propertyKey) || '';


export const ApiDescription = (description: string) =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(apiDescriptionKey, description, target, propertyKey);
  };
export const getApiDescription = (target: any, propertyKey: string): string => Reflect.getMetadata(apiDescriptionKey, target, propertyKey) || '';

export const ApiSuccessExample = (example: string) =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(apiSuccessExampleKey, example, target, propertyKey);
  };
export const getApiSuccessExample = (target: any, propertyKey: string): string => Reflect.getMetadata(apiSuccessExampleKey, target, propertyKey) || '';
