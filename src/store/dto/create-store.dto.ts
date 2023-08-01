import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsUrl, MinLength } from 'class-validator';
import { v4 as uuidV4 } from 'uuid';
export class CreateStoreDto {
  @IsUUID()
  id = uuidV4();
  @ApiProperty({
    description: 'Entity Name',
    example: 'Example',
  })
  @IsString()
  @MinLength(3)
  name: string;
  @ApiProperty({
    description: 'Entity URL',
    example: 'http://example.com',
  })
  @IsUrl()
  url: string;
}
