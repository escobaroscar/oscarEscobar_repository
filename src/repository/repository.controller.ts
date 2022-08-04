
import { Controller, Get, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {data} from '../../utilities/repositories'
@Controller('repository')
export class RepositoryController {
    @Get()
    getAll(@Res() req: Request, @Res() res: Response) {
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
