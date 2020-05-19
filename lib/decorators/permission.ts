import { permissionKey } from '../metaKeys';

interface IPermission {
  roles: string;
  name?: string;
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
