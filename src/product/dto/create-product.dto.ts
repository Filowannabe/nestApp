import { IsDate, IsNumber, IsString, IsUUID, MinLength } from 'class-validator';
import { v4 as uuidV4 } from 'uuid';
export class CreateProductDto {
  @IsUUID()
  id = uuidV4();

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  sku: string;

  @IsNumber()
  inventoryQuantity: number;

  @IsDate()
  inventoryUpdatedTime = new Date();

  @IsUUID()
  storeId: string;
}
