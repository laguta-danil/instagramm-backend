import { Controller, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()
@ApiTags('Testing')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Delete('/testing')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Wipe all data' })
  wipeData() {
    return this.appService.wipeAllData();
  }
}
