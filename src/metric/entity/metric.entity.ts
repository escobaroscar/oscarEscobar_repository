import { TribeEntity } from "src/tribu/entity/tribu.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'metric'})
export class MetricEntity {
    @PrimaryGeneratedColumn()
    id_repository:number;

    @Column({type: 'float',  nullable: false})
    coverage:number;
    
    @Column({type: 'integer', nullable: false})
    bugs:number;

    @Column({type: 'integer', nullable: false})
    vulnerabilities:number;
    
    @Column({type: 'integer', nullable: false})
    hostpot:number;

    @Column({type: 'integer', nullable: false})
    code_smells:number;
}