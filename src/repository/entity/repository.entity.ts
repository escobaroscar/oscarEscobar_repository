import { MetricEntity } from "src/metric/entity/metric.entity";
import { TribeEntity } from "src/tribu/entity/tribu.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'repository'})
export class RepositoryEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar', length:50, nullable: false})
    name:string;

    @Column({type: 'varchar',length:1, nullable: false})
    state:string;

    @CreateDateColumn({
        type:'timestamptz',
        default: () =>'CURRENT_TIMESTAMP',
    })
    create_time: Date;

    @Column({type: 'varchar',length:1, nullable: false})
    status:string;

    @OneToOne(()=>MetricEntity  , (metric)=> metric.repository ) 
    metric: MetricEntity;

    @ManyToOne((
        )=>TribeEntity,
        (tribe )=>tribe.repositories,
        )
    tribe:TribeEntity;
}