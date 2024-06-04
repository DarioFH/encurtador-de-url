import { ApiProperty } from "@nestjs/swagger";

export class ResponseCreateUserDto {
    @ApiProperty({
        example: 1,
        description: 'User Id',
    })
    id: number

    @ApiProperty({
        example: "Joãozinho",
        description: 'User Name'
    })
    nome: string

    @ApiProperty({
        example: "email@email.com",
        description: 'User Email'
    })
    email: string

}