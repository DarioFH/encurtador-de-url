import { Usuario } from "src/usuario/entities/usuario.entity";
import { AfterLoad, BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid'

@Entity()
export class Encurtador {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string

    @Column({
        default: 0
    })
    count: number

    @Column({
        unique: true,
        length: '6'
    })
    hash: string
    
    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
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
            this.id = uuidv4();
        }
    }

}
