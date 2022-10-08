import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class PaginationParams {

    @ApiProperty({ required: false })
    @Type(() => Number)
    page?: number;

    @ApiProperty({ required: false })
    @Type(() => Number)
    size?: number;

    @ApiProperty({ required: false, default: '-updatedAt' })
    sortBy?: string = '-updatedAt';

}