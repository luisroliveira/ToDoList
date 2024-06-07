import { Prisma, Tarefa } from '@prisma/client';
import prisma from '../database';

export class TarefaRepository{
    async create(data: Prisma.TarefaCreateInput): Promise<Tarefa> {
        const tarefa = await prisma.tarefa.create({ data });
        return tarefa;
    }

    async delete(id: string): Promise<Tarefa | null> {
        const deletedTarefa = await prisma.tarefa.delete({
          where: { id },
        });
        return deletedTarefa;
      }

    async findById(id: string): Promise<Tarefa | null> {
        const tarefa = await prisma.tarefa.findUnique({
          where: { id: id },
        });
        return tarefa;
    }

    async getMembroTarefas(id: string) {
        try {
            const tarefas = await prisma.tarefa.findMany({
                where: {
                    membroId: id,
                },
                select: {
                    id: true,
                    nome: true,
                    descricao: true,
                    finalizada: true,
                    dataTermino: true,
                    prioridade: true,
                    membro: {
                        select: {
                            id: true,
                            nome: true,
                            email: true
                        }
                    }
                },
            });
            return tarefas;
          } catch (error) {
            console.error('Erro na consulta: ', error);
            throw error;
          }
    }
}