import { IsString, IsUUID, IsUrl, MinLength } from 'class-validator';
import { v4 as uuidV4 } from 'uuid';
export class CreateStoreDto {
  @IsUUID()
  id = uuidV4();

  @IsString()
  @MinLength(3)
  name: string;

  @IsUrl()
  url: string;
}
