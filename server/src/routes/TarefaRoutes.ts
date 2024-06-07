import { Router } from 'express';
import { TarefaController } from '../controllers';

const tarefaRouter = Router();

tarefaRouter.route('/').post(TarefaController.create);
tarefaRouter.route('/:tarefaId').delete(TarefaController.delete);
tarefaRouter.route('/:membroId/getMembroTarefas').get(TarefaController.getMembroTarefasById);

export default tarefaRouter;
