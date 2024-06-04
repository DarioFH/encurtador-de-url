import { ApiProperty } from "@nestjs/swagger";

export class ResponseAuthDto {
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

    @ApiProperty({
        example: "BearerTokenExample",
        description: 'Auth Token'
    })
    access_token: string
}