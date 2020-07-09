import { Router } from 'express'

import passport from 'passport';


import authCtr from '../controllers/auth.controller';

const router = Router();

router.get('/signup', authCtr.getSignup);

router.get('/login', authCtr.getLogin);

//register
router.post('/signup', passport.authenticate('signup', {
    failureRedirect: '/signup',
    successRedirect: '/profile',
    failureFlash: true
}));

router.post('/login', (req, res, next) => {
    passport.authenticate('login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
})


/*router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callBack',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/profile');
    });*/

//logout
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})

export default router;