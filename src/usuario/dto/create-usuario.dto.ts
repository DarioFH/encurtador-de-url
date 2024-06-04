import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUsuarioDto {

    @IsNotEmpty()
    @ApiProperty({example: "Joãozinho"})
    nome: string

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({example: "email@email.com"})
    email: string

    @IsNotEmpty()
    @ApiProperty({example: "suamelhorsenha"})
    senha: string

}
