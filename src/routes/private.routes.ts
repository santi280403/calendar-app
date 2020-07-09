import { Router } from 'express';

import profileCtr from '../controllers/profile.controller'

const router = Router();

router.get('/profile', profileCtr.getProfile);

export default router;