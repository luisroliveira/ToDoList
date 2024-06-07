import { Prisma, Membro } from '@prisma/client';
import prisma from '../database';
import { HttpException } from '../middlewares';

export class MembroRepository {
  async create(data: Prisma.MembroCreateInput): Promise<Membro> {
    const tarefa = await prisma.membro.create({ data });
    return tarefa;
  }

  async delete(id: string): Promise<Membro | null> {
    await prisma.tarefa.deleteMany({
      where: {
          membroId: id,
      },
    });

    const deletedTarefa = await prisma.membro.delete({
      where: { id },
    });
    return deletedTarefa;
  }

  async findByEmail(email: string): Promise<Membro | null> {
    const tarefa = await prisma.membro.findUnique({ where: { email } });
    return tarefa;
  }

  async findById(id: string): Promise<Membro | null> {
    console.log("ID: " + id)
    const membro = await prisma.membro.findUnique({
      where: { id: id },
    });
    return membro;
  }
}
