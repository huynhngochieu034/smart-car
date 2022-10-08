import { ApiProperty } from "@nestjs/swagger";
import { PaginationParams } from "src/utils/paginationParams";

export class FilterCar extends PaginationParams {
    @ApiProperty({ required: false })
    'name.equals': string;

    @ApiProperty({ required: false })
    'deviceId.equals': string;

    @ApiProperty({ required: false })
    'licensePlates.equals': string;
}