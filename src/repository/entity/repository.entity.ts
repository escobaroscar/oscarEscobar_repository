import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'repository'})
export class RepositoryEntity {
    @PrimaryGeneratedColumn()
    id_tribe:number;

    @Column({type: 'varchar', length:50, nullable: false})
    name:string;

    @Column({type: 'varchar',length:1, nullable: false})
    state:string;

    @CreateDateColumn()
    create_timer_timestamp: Date;

    @Column({type: 'varchar',length:1, nullable: false})
    status:string;
}