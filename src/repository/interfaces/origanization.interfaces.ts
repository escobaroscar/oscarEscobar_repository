export interface Repository {
    id:number;
    id_tribe:number;
    name:string;
    state:string;
    create_timer_timestamp?: Date;
    status?:string;
}