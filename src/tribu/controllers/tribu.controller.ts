import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateTribeDto } from '../dtos/tribe.dto';
import { TribuService } from '../services/tribu.service';

@Controller('tribe')
export class TribuController {
    constructor( private readonly tribeService: TribuService ) {}
    @Post()
    create(@Body() tribeDto: CreateTribeDto) {
      return this.tribeService.create(tribeDto);
    }
    
    @Get(':id')
    getTribeById(@Param('id', ParseIntPipe ) id: number) {
      return this.tribeService.findTribu( id );
    }
}
