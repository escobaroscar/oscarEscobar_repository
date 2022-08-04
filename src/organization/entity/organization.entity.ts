import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'organization'})
export class OrganizationEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar', length:50, nullable: false})
    name:string;
    
    @Column({type: 'integer', nullable: false})
    status:number;
}