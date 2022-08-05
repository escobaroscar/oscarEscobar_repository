import { Injectable } from '@nestjs/common';
import {  parse } from 'json2csv';
@Injectable()
export class DownlandService {

    downland(){
        const todos = [
            {
                "id": 1,
                "title": "delectus aut autem",
                "completed": false
            },
            {
                "id": 2,
                "title": "quis ut nam facilis et officia qui",
                "completed": false
            },
            {
                "id": 3,
                "title": "fugiat veniam minus",
                "completed": false
            }];

            const csv = parse(todos)

            return csv;
    }
}
