import { ApiProperty } from "@nestjs/swagger";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { AfterLoad, BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {randomUUID} from 'node:crypto'

@Entity()
export class Encurtador {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        example: "hashuuid"
    })
    id: string;

    @Column()
    @ApiProperty({
        example: "https://google.com"
    })
    url: string

    @Column({
        default: 0
    })
    @ApiProperty({
        example: 999
    })
    count: number

    @Column({
        unique: true,
        length: '6'
    })
    @ApiProperty({
        example: "hash"
    })
    hash: string
    
    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    @ApiProperty({
        example: "2000-01-01"
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    @ApiProperty({
        example: "2000-01-01"
    })
    updated_at: Date;

    @DeleteDateColumn({nullable: true})
    deleted_at?: Date;
    
    
    @ManyToOne(() => Usuario, (usuario) => usuario.encurtadores)
    @JoinColumn({name: 'usuario_id'})
    usuario: Usuario
    

    @BeforeInsert()
    generateId() {
        if(!this.id) {
            this.id = randomUUID();
        }
    }

}
