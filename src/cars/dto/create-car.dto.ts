import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCarDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    licensePlates: string;

    @ApiProperty()
    @IsNotEmpty()
    deviceId: string;
    
}
