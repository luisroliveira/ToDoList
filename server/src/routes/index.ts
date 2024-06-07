import { Router } from 'express';

import membroRouter from './MembroRoutes';
// import authRouter from './AuthRoutes';
// import tarefaRouter from './TarefaRoutes';

const router = Router();

router.use('/membro', membroRouter);
// router.use('/sessions', authRouter);
// router.use('/tarefa', tarefaRouter);

router.route('/').get((_, res) => {
  res.status(200).send('ok');
});

export default router;
