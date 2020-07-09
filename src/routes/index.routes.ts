import { Router } from 'express';

import controller from '../controllers/index.controllers'

const router = Router();

router.get('/', controller.mainView)

export default router;