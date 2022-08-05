import { OrganizationEntity } from "src/organization/entity/organization.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'tribe'})
export class TribeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:50, nullable: false})
    name:string;

    @Column({type: 'integer', nullable: false})
    status:number;

    @ManyToOne(
        ()=> OrganizationEntity,
        (organization)=>organization.tribes,{
            nullable:false
        }
    )
    
    organization: OrganizationEntity;
    
}