import { permissionKey, permissionGroupKey } from '../metaKeys';

interface IPermission {
  roles: string;
  name?: string;
  // group?: string;
  // groupName?: string;
}
interface IPermissionGroup {
  group: string;
  name?: string;
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

export function getPermissionGroup(target: any): IPermissionGroup {
  return Reflect.getMetadata(permissionGroupKey, target) || { group: target.name, name: target.name };
}

export function PermissionGroup(group: IPermissionGroup) {
  return function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata(permissionGroupKey, group, constructor);
    return constructor;
  };
}
