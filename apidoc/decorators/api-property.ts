/**
 * Created by 清辉 on 2020/1/17 15:11
 */
import { saveProperty } from '../ObjectPropertyStore';

interface ApiPropertyOption {
  require?: boolean;
  type?: string;
  desc?: string;
}

const baseApiProperty = (defaultOptions = false) =>
  (options: ApiPropertyOption = {}) =>
    (target: any, propertyKey: string) => {

      const { require = true, type = 'unknown', desc = '' } = options;

      saveProperty(target, { key: propertyKey, type, desc, require: defaultOptions ? false : require });
    };


export const ApiProperty = baseApiProperty();
export const ApiOptionProperty = baseApiProperty(true);
