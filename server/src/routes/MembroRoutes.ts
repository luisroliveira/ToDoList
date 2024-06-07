import { Router } from 'express';
import MembroController from '../controllers/MembroController';

const membroRouter = Router();

membroRouter.route('/').post(MembroController.create);
membroRouter.route('/:membroId').delete(MembroController.delete);
membroRouter.route('/:membroId').get(MembroController.getById);
membroRouter.route('/:membroEmail/getIdEmail').get(MembroController.getIdByNickName);

export default membroRouter;
