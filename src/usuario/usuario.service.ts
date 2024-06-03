import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { EncryptUtils } from 'src/utils/encrypt-utils.providers';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario) private userRepository: Repository<Usuario>,
    private readonly encryptUtils: EncryptUtils
  ){}

  msgErrorNotFound:  string = "Usuário não localizado!";
  msgErrorNotCreate: string = "Não foi possível criar o usuário";
  msgErrorWrongPass: string = "Senha inválida";


  async create(userData: CreateUsuarioDto): Promise<Usuario> {
    
    try {
      const senha = await this.encryptUtils.generateHash(userData.senha)
      const user = this.userRepository.create({...userData, senha})
      
      return this.userRepository.save(user)
    } catch (error) {
      throw new Error(this.msgErrorNotCreate)
    }
    
  }

  async findAll(): Promise<Usuario[]> {
    const users = await this.userRepository.find()

    return users
  }

  async findOne(id: number): Promise<Usuario> {
    const user = await this.userRepository.findOneBy({id})

    if(!user){
      throw new Error(this.msgErrorNotFound)
    }

    return user
  }

  async findOneByEmail(email: string): Promise<Usuario> {
    const user = await this.userRepository.findOneBy({email})

    if(!user){
      throw new Error(this.msgErrorNotFound)
    }
    return user
  }

  async update(id: number, updateUserData: UpdateUsuarioDto): Promise<Usuario> {
    let updateUser = updateUserData;
    if(updateUserData.hasOwnProperty('senha') && updateUserData.senha.length > 0){
      updateUser.senha = await this.encryptUtils.generateHash(updateUserData.senha)
    }
    const user = await this.userRepository.preload({id, ...updateUser})
    if(!user) {
      throw new Error(this.msgErrorNotFound)
    }
    return this.userRepository.save(user)
  }

  async remove(id: number): Promise<Usuario> {
    const user = await this.findOne(id)

    if(!user){
      throw new NotFoundException(this.msgErrorNotFound)
    }

    await this.userRepository.softDelete({id: user.id})
    return user
  }


  async auth(email: string, senha: string) {
    try {
      const user = await this.findOneByEmail(email)
      
      const auth = await this.encryptUtils.compareHash(senha, user.senha);

      if(auth){
        return user
      }else{
        throw new Error(this.msgErrorWrongPass)
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }


}
