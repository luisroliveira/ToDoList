import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { MembroRepository } from '../repositories';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const email = username

      const membroRepository = new MembroRepository();
      const membro = await membroRepository.findByEmail(email);

      if (!membro) {
        return next({
          status: 400,
          message: 'Invalid Credentials',
        });
      }

      const checkPassword = await compare(password, membro.password);

      if (!checkPassword) {
        return next({
          status: 400,
          message: 'Invalid Credentials',
        });
      }

      console.log("++=")

      const accessToken = jwt.sign(
        { nickName: membro.email },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '1d',
        },
      );

      const { password: _, ...membroWithoutPassword } = membro;

      console.log("Logado")

      res.locals = {
        status: 200,
        message: 'Membro logged in',
        data: {
          accessToken,
          membro: membroWithoutPassword,
        },
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = jwt.sign(
        { nickName: null },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '10',
        },
      );

      res.locals = {
        status: 200,
        message: 'Membro logged out',
        data: {
          accessToken,
        },
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new AuthController();
