import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositoryService {
    private repositories = [
        {id:1,state: 604},
        {id:2,state:605},
        {id:3,state:606}
         ];
    findAll(){
        return this.repositories;
    }
}
