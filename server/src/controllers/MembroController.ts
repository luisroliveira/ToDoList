import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { MembroRepository } from '../repositories';
import {
  Membro,
  validateName,
  validateEmail
} from '../DTOs';

class MembroController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const membroData = req.body;
      const membroRepository = new MembroRepository();
      const validatedData = Membro.parse(membroData); // passe o mouse por cima de validatedData no VSCode e veja o tipo!

      const checkEmail = await membroRepository.findByEmail(
        validatedData.email,
      );

      if (checkEmail) {
        return next({
          status: 409,
          message: 'This Email is already registered',
        });
      }

      const membroWithHashedPassword = await hash(validatedData.password, 6);

      const membro = await membroRepository.create({
        ...validatedData,
        password: membroWithHashedPassword,
      });

      const { password: _, ...membroWithoutPassword } = membro;

      res.locals = {
        status: 201,
        message: 'Membro created',
        data: membroWithoutPassword,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { membroId } = req.params;
    const membroRepository = new MembroRepository();
    const membro = await membroRepository.findById(membroId);
    if (membro == null) {
      return next({
        status: 400,
        message: 'This id is not registred',
      });
    }

    const membroDeleted = await membroRepository.delete(membroId)
    res.locals = {
      status: 200,
      message: 'Membro deletado: ',
      data: membroDeleted,
    };

    return next();
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { membroId } = req.params;
      const membroRepository = new MembroRepository();
      const membro = await membroRepository.findById(membroId);

      if (!membro) {
        return next({
          status: 404,
          message: 'Membro not found',
        });
      }

      const { password: _, ...membroWithoutPassword } = membro;

      res.locals = {
        status: 200,
        message: 'Membro found',
        data: membroWithoutPassword,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getIdByNickName(req: Request, res: Response, next: NextFunction) {
    const { membroNickName } = req.params;
    const membroRepository = new MembroRepository();

    const membro = await membroRepository.findByEmail(membroNickName);
    if (membro == null) {
      return next({
        status: 400,
        message: 'This email is not registred',
      });
    }

    res.locals = {
      status: 200,
      message: 'Membro: ',
      data: membro?.id,
    };

    return next();
  }
}

export default new MembroController();
