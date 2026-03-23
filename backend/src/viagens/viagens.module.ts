import { Module } from '@nestjs/common';
import { ViagensController } from './viagens.controller';
import { ViagensService } from './viagens.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ViagensController],
  providers: [ViagensService],
})
export class ViagensModule {}
