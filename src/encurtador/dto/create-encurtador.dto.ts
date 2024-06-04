import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateEncurtadorDto {
    @IsNotEmpty()
    @IsUrl()
    @ApiProperty({
        example: "https://google.com",
        description: "Url de destino"
    })
    url: string
}
