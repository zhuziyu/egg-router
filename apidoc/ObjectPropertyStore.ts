/**
 * Created by 清辉 on 2020/1/17 15:18
 */
import { DesignParamTypes, DesignType } from '../lib/metaKeys';

const PropertyStore: Map<any, any[]> = new Map();

export const saveProperty = (obj: any, data: any) => {
  const existsData: any[] = PropertyStore.get(obj) || [];

  existsData.push(data);

  PropertyStore.set(obj, existsData);

};

export const getProperties = (obj: any) => {
  const properties: any[] = PropertyStore.get(obj) || [];

  for (const property of properties) {
    const propertyType = Reflect.getMetadata(DesignType, obj, property.key);
    property.type = propertyType ? propertyType.name : 'unknown';
  }

  return properties;
};
