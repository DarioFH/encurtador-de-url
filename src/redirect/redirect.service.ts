import { Injectable, NotFoundException } from '@nestjs/common';
import { EncurtadorService } from 'src/encurtador/encurtador.service';

@Injectable()
export class RedirectService {
  constructor(
    private readonly encurtadorService: EncurtadorService
  ){}

  msgErrorNotFound: string = "Url não localizada!"

  async getFullUrl(hash: string): Promise<string>{
    const url = await this.encurtadorService.findByHash(hash)

    if(!url){
      throw new NotFoundException(this.msgErrorNotFound)
    }

    await this.encurtadorService.addCount(url)
    return url.url
  }
}
