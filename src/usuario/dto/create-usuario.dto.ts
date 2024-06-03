import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUsuarioDto {

    @IsNotEmpty()
    nome: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    senha: string

}
