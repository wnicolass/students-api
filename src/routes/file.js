import { Router } from 'express';
import fileController from '../controllers/FileController';

const router = new Router();

router.post('/', fileController.store);

export default router;
