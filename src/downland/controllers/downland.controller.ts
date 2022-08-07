import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { DownlandService } from '../services/downland.service';

@Controller('downland')
export class DownlandController {
    constructor( private readonly downlandService: DownlandService ) {}
    @Get('/tribe/:id')
    async download(@Param('id', ParseIntPipe ) id: number , @Res () res){
        const response = await  this.downlandService.downlandTribuById(id);
        res.header('Content-Type', 'text/csv');
        res.attachment(`tribe${id}.csv`);
        return res.send(response);
    }

}
