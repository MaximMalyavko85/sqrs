import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { PaginationDto } from "../dtos";
import { Type, applyDecorators } from "@nestjs/common";

export class ReasponseWithPagination<T> extends PaginationDto {
  @ApiProperty({description: 'Records limit', type: 'number'})
  limit: number;

  @ApiProperty({description: 'Records offset', type: 'number'})
  offset: number;

  @ApiProperty({description: 'Records count', type: 'number'})
  total!: number;

  @ApiProperty({
    description: "data", 
    default: [], 
    isArray: true, 
    items: {}
  })
  data: T[];
}

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>> (
  dataDto: DataDto
) => applyDecorators(
  ApiExtraModels(ReasponseWithPagination),
  ApiOkResponse({
    schema: {
      allOf: [
        {$ref: getSchemaPath(ReasponseWithPagination)},
        {
          properties: {
              data: {
                  type: "array",
                  items: {$ref: getSchemaPath(dataDto)}
              }
          }
        }
      ]
    }
  })
);