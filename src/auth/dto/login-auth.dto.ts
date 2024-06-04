import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginAuthDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        example: 'email@email.com', 
        description: 'User e-mail'
    })
    email: string;

    @IsNotEmpty()
    @ApiProperty({
        example: 'password', 
        description: 'User password'
    })
    senha: string;
}