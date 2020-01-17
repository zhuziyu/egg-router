/**
 * Created by 清辉 on 2020/1/17 11:06
 */
import { ApiOptionProperty, ApiProperty } from '../../../';

export class CreateHomeDto {

  @ApiProperty()
  private readonly name: string;

  @ApiOptionProperty()
  private readonly age: number;

  private readonly birthday: Date;

  private readonly interest: string[];

}
