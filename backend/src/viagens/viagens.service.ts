import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateViagemDto } from './dto/create-viagem.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ViagensService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.trip.findMany({ where: { userId: userId } });
  }

  create(data: CreateViagemDto, userId: string) {
    try {
      return this.prisma.trip.create({
        data: {
          nome: data.nome,
          dataInicio: new Date(data.dataInicio),
          dataFim: new Date(data.dataFim),
          userId,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(String(error));
    }
  }

  remover(id: string) {
    return this.prisma.trip.delete({
      where: { id },
    });
  }

  atualizar(id: string, dados: CreateViagemDto) {
    return this.prisma.trip.update({
      where: { id },
      data: {
        nome: dados.nome,
        dataInicio: new Date(dados.dataInicio),
        dataFim: new Date(dados.dataFim),
      },
    });
  }
}
