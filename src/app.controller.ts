import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { APIGuard, ApiIdentifier } from './auth/auth.guard';

@Controller()
@UseGuards(APIGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  //! CASE 1 : API Identifier is incorrect
  //  In this case, Guard will deny the access to API
  @Get('/1')
  // @UseGuards(APIGuard)
  @ApiIdentifier('hello')
  example1(): string {
    return this.appService.success();
  }

  //! CASE 2 : API Identifier is not provided
  //  In this case, Guard will allow the access to API
  @Get('/2')
  // @UseGuards(APIGuard)
  example2(): string {
    return this.appService.success();
  }

  //* CASE 3 : API Identifier is correct
  //  In this case, Guard will allow the access to API If VALUE is correct
  @Get('/3')
  // @UseGuards(APIGuard)
  @ApiIdentifier('analytics')
  example3(): string {
    return this.appService.success();
  }
}
