import { PartialType } from '@nestjs/mapped-types';
import { CreateEncurtadorDto } from './create-encurtador.dto';

export class UpdateEncurtadorDto extends PartialType(CreateEncurtadorDto) {}
