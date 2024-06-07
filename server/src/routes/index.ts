import { Router } from 'express';

import membroRouter from './MembroRoutes';
import tarefaRouter from './TarefaRoutes';
import authRouter from './AuthRoutes';

const router = Router();

router.use('/membro', membroRouter);
router.use('/tarefa', tarefaRouter);
router.use('/sessions', authRouter);

router.route('/').get((_, res) => {
  res.status(200).send('ok');
});

export default router;
