import { IsString } from 'class-validator';

export class CreateViagemDto {
  @IsString()
  nome: string;

  @IsString()
  dataInicio: string;

  @IsString()
  dataFim: string;
}
