import { Encurtador } from "src/encurtador/entities/encurtador.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'usuarios'})
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    senha: string

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

    @OneToMany(() => Encurtador, (e) => e.usuario)
    encurtadores: Encurtador[]
}
