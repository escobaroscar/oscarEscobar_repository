
import { Body, Controller, Get, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateRepositoryDto } from '../dtos/create-repository.dto';
import { RepositoryService } from '../repository.service';
@Controller('repository')
export class RepositoryController {
    constructor( private readonly repositoryService: RepositoryService ) {}
    @Get()
    getAll() {
        return this.repositoryService.findAll();
    }
    @Post()
    create(@Body() createRepositoryDto: CreateRepositoryDto) {
      return this.repositoryService.create(createRepositoryDto);
    }

    @Get(':id')
    getTribeById(@Param('id', ParseIntPipe ) id: number) {
      return this.repositoryService.findOneId( id );
    }
}
