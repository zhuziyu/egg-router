import { permissionKey } from '../metaKeys';

interface IPermission {
  name: string;
  api?: string;
  group?: string;
  groupName?: string;
}

export function getPermission(target: any, propertyKey: string): IPermission {
  return Reflect.getMetadata(permissionKey, target, propertyKey);
}

export function Permission(permission: IPermission) {
  return (target: any, property: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(permissionKey, permission, target, property);
    descriptor.enumerable = true;
  };
}
