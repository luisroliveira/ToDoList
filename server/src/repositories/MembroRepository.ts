import { Prisma, Membro } from '@prisma/client';
import prisma from '../database';
import { HttpException } from '../middlewares';

export class MembroRepository {
  async create(data: Prisma.MembroCreateInput): Promise<Membro> {
    const user = await prisma.membro.create({ data });
    return user;
  }

  async delete(id: string): Promise<Membro | null> {
    const deletedUser = await prisma.membro.delete({
      where: { id },
    });
    return deletedUser;
  }

  async findByEmail(email: string): Promise<Membro | null> {
    const user = await prisma.membro.findUnique({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<Membro | null> {
    console.log("ID: " + id)
    const membro = await prisma.membro.findUnique({
      where: { id: id },
    });
    return membro;
  }
}
