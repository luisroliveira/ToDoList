import { Request, Response, NextFunction } from 'express';
import { TarefaRepository, MembroRepository } from '../repositories';
import { Tarefa } from '../DTOs';

class TarefaController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const membroRepository = new MembroRepository()
            const tarefaData = req.body;
            const tarefaRepository = new TarefaRepository();
            const validatedData = Tarefa.parse(tarefaData); // passe o mouse por cima de validatedData no VSCode e veja o tipo!
            const checkId = await membroRepository.findById(
                validatedData.membroId,
            );

            console.log(validatedData)

            console.log(checkId)

        
            if (!checkId) {
                return next({
                status: 409,
                message: 'Id do membro nao está cadastrado',
                });
            }      
            const tarefa = await tarefaRepository.create({
                ...validatedData,
            });
            
            res.locals = {
                status: 201,
                message: 'Tarefa created',
                data: tarefa,
            };
        
            return next();
        } catch (error) {
            return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const { tarefaId } = req.params;
        const tarefaRepository = new TarefaRepository();
        const tarefa = await tarefaRepository.findById(tarefaId);
        if (tarefa == null) {
          return next({
            status: 400,
            message: 'This id is not registred',
          });
        }
    
        const tarefaDeleted = await tarefaRepository.delete(tarefaId)
        res.locals = {
          status: 200,
          message: 'Tarefa deletada: ',
          data: tarefaDeleted,
        };
    
        return next();
      }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
          const { tarefaId } = req.params;
          const tarefaRepository = new TarefaRepository();
          const tarefa = await tarefaRepository.findById(tarefaId);
    
          if (!tarefa) {
            return next({
              status: 404,
              message: 'Membro not found',
            });
          }
    
          res.locals = {
            status: 200,
            message: 'Membro found',
            data: tarefa,
          };
    
          return next();
        } catch (error) {
          return next(error);
        }
    }

    async getMembroTarefasById(req: Request, res: Response, next: NextFunction) {
        try {
          const { membroId } = req.params;
          console.log("++++++++++++ " + membroId)
          const tarefaRepository = new TarefaRepository();
          const membroRepository = new MembroRepository();
          const membro = await membroRepository.findById(membroId);
            
          if (!membro) {
            return next({
              status: 404,
              message: 'Membro not found',
            });
          }

          const tarefas = await tarefaRepository.getMembroTarefas(membroId)
    
          res.locals = {
            status: 200,
            message: 'Tarefas found',
            data: tarefas,
          };
    
          return next();
        } catch (error) {
          return next(error);
        }
    }
}

export default new TarefaController();
