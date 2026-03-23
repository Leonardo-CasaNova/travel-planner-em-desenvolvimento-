import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ViagensService } from './viagens.service';
import { CreateViagemDto } from './dto/create-viagem.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('viagens')
export class ViagensController {
  constructor(private readonly viagensService: ViagensService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@GetUser('userId') userId: string) {
    try {
      return await this.viagensService.findAll(userId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          { message: 'Erro ao criar viagem', error: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        { message: 'Erro ao criar viagem', error: String(error) },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() dados: CreateViagemDto,
    @GetUser('userId') userId: string,
  ) {
    try {
      return await this.viagensService.create(dados, userId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          { message: 'Erro ao criar viagem', error: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        { message: 'Erro ao criar viagem', error: String(error) },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remover(@Param('id') id: string) {
    try {
      return await this.viagensService.remover(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          { message: 'Erro ao criar viagem', error: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        { message: 'Erro ao criar viagem', error: String(error) },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async atualizar(@Param('id') id: string, @Body() dados: CreateViagemDto) {
    try {
      return await this.viagensService.atualizar(id, dados);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          { message: 'Erro ao criar viagem', error: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        { message: 'Erro ao criar viagem', error: String(error) },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
