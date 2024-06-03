import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEncurtadorDto } from './dto/create-encurtador.dto';
import { UpdateEncurtadorDto } from './dto/update-encurtador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Encurtador } from './entities/encurtador.entity';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class EncurtadorService {

  constructor(
    @InjectRepository(Encurtador)private readonly encurtadorRepository: Repository<Encurtador>,
    private readonly usuarioService: UsuarioService
  ){}

  msgErrorNotFound: string = "Url não localizada!"
  msgErrorUpdate: string = "Não foi possível atualizar a url!"
  msgErrorNotFoundHash: string = "Não foi possível localizar a url com a hash fornecida!"

  async create(user_id: number, createEncurtadorDto: CreateEncurtadorDto): Promise<any> {
    const hash = nanoid(6)
    
    const payloadUrl: any = {
      url: createEncurtadorDto.url,
      hash
    }

    if(user_id > 0){
      payloadUrl.usuario = await this.usuarioService.findOne(user_id)
    }
    const url = this.encurtadorRepository.create(payloadUrl)

    if(!url){
      throw new Error(this.msgErrorNotFound);
    }

    const savedUrl = await this.encurtadorRepository.save(url)

    if(!savedUrl){
      throw new Error("Não foi possível criar a url!")
    }
   
    return `${process.env.BASE_URL}/${payloadUrl.hash}`
  }

  async findAll(user_id: number): Promise<Encurtador[]> {
    try {
      const urls = await this.encurtadorRepository.find({
        where: {usuario: {id: user_id}},
        order: {created_at: 'asc'},
      })
      
      return urls
    } catch (error) {
      throw new Error("Não foi possível localizar as url's")
    }
  }

  async findOne(id: string): Promise<Encurtador>{
    const url = await this.encurtadorRepository.findOneBy({id: id})

    if(!url){
      throw new NotFoundException(this.msgErrorNotFound)
    }
    return url
  }

  async findByHash(hash: string): Promise<Encurtador> {
    const url = await this.encurtadorRepository.findOneBy({hash: hash})

    if(!url){
      throw new NotFoundException(this.msgErrorNotFoundHash)
    }

    return url
  }

  async update(id: string, updateEncurtadorDto: UpdateEncurtadorDto) {
    const url = await this.encurtadorRepository.preload({id: id, ...updateEncurtadorDto})

    if(!url) {
      throw new NotFoundException(this.msgErrorUpdate)
    }

    return this.encurtadorRepository.save(url)
  }

  async remove(id: string): Promise<Encurtador> {
    const url = await this.findOne(id)

    if(!url) {
      throw new NotFoundException(this.msgErrorNotFound)
    }

    await this.encurtadorRepository.softDelete({id: url.id})
    return url
  }

  async addCount(url: Encurtador): Promise<void> {
    url.count += 1
    await this.encurtadorRepository.save(url)
  }
}
