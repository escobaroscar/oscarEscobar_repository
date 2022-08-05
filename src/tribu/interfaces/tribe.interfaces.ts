import { OrganizationEntity } from "src/organization/entity/organization.entity";

export interface Tribe {
    id_tribe:number;
    name?: string;
    status?: number;
    organizacionId: number
}