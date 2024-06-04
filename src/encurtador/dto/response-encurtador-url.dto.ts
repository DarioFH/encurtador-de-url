import { ApiProperty } from "@nestjs/swagger";

export class ResponseEncurtadorUrl {
    @ApiProperty({
        example: "hashuuid"
    })
    id: string;

    @ApiProperty({
        example: "https://google.com"
    })
    url: string

    @ApiProperty({
        example: 999
    })
    count: number

    @ApiProperty({
        example: "hash"
    })
    hash: string
    
    @ApiProperty({
        example: "2000-01-01"
    })
    created_at: Date;

    @ApiProperty({
        example: "2000-01-01"
    })
    updated_at: Date;
}