import { Controller, Get, Res } from '@nestjs/common';
import { DownlandService } from '../services/downland.service';

@Controller('downland')
export class DownlandController {
    constructor( private readonly downlandService: DownlandService ) {}
    @Get()
    async download(@Res() res){
        const response = await  this.downlandService.downland();
        res.header('Content-Type', 'text/csv');
        res.attachment('orders.csv');
        return res.send(response);
    }

}
