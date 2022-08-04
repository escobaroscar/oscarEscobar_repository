
import { Controller, Get, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { RepositoryService } from './repository.service';
@Controller('repository')
export class RepositoryController {
    constructor( private readonly repositoryService: RepositoryService ) {}
    @Get()
    getAll(@Res() req: Request, @Res() res: Response) {
        const data = this.repositoryService.findAll();
      res
        .status(200)
        .json({
          status: 'success',
          statusCode: 200,
          message: 'Datos obtenidos.',
          repositories: data,
        });
    }
}
