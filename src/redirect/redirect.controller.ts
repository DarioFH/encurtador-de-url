import { Controller, Get, Post, Body, Patch, Param, Delete, Response } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { Public } from 'src/auth/auth.public';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('')
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get(':id')
  @Public()
  @ApiExcludeEndpoint()
  async redirect(@Param('id') hash: string, @Response() res) {
    const url = await this.redirectService.getFullUrl(hash)
    res.redirect(url)
  }
}
