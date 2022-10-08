import { ApiProperty } from "@nestjs/swagger";

export class FilterLocationsHistoryDto {
    @ApiProperty()
    'deviceId.equals': string;

    @ApiProperty()
    'startTime.greaterThan': Date;

    @ApiProperty()
    'endTime.lessThan': Date;
}
