import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    @ApiProperty({description: 'Records offset', type: 'number'})
    @IsOptional()
    @Min(0)
    @IsNumber({allowNaN: false, allowInfinity: false})
    @Type(() => Number)
    offset = 0; 

    @ApiProperty({description: 'Number of records', type: 'number'})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false}) 
    @Type(() => Number)
    @IsPositive() //more then 0
    limit = 15;
}