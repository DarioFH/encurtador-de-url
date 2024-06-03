import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateEncurtadorDto {
    @IsNotEmpty()
    @IsUrl()
    url: string
}
