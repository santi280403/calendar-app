import { Router } from 'express';

import profileCtr from '../controllers/private.controller'

import auth from '../middleware/auth';

const router = Router();

router.get('/profile', auth.isLoggedIn, profileCtr.getProfile);

router.get('/add', auth.isLoggedIn, profileCtr.addInformationProfile);

router.post('/add', auth.isLoggedIn, profileCtr.sendInformation);

router.post('/edit_info', auth.isLoggedIn, profileCtr.editInfo);

router.get('/calendar', auth.isLoggedIn, profileCtr.getCalendar);

export default router;