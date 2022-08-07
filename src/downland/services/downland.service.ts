import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {  parse } from 'json2csv';
import axios ,{ AxiosInstance } from "axios";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DownlandService {

    private readonly axios:AxiosInstance= axios
    constructor(
        private envConfig:ConfigService
    ){}
    async downlandTribuById(id: number){
        try {
            const {data} = await this.axios.get(`${this.envConfig.get('API_URL')}/tribe/${id}`);
                const csv = parse(data.repositories)
                return csv;
        } catch (error) {
            throw new HttpException(`Ocurrió algo inesperado al descargar la informacion, vuelve a intentarlo mas tarde.`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
