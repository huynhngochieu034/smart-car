import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateLocationCarDto {

    @ApiProperty()
    @IsNotEmpty()
    deviceId: string;

    @ApiProperty()
    @IsNotEmpty()
    timestamp: number;

    @ApiProperty()
    @IsNotEmpty()
    longitude: number;

    @ApiProperty()
    @IsNotEmpty()
    latitude: number;
    
}
