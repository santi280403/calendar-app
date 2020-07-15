import { Router } from 'express'

import passport from 'passport';

import auth from '../middleware/auth';

//controller passport
import authCtr from '../controllers/auth.controller';



const router = Router();

router.get('/signup',auth.isNotLoggedIn,  authCtr.getSignup);

router.get('/login', auth.isNotLoggedIn,  authCtr.getLogin);

//register
router.post('/signup',auth.isNotLoggedIn,  passport.authenticate('signup', {
    failureRedirect: '/signup',
    successRedirect: '/add',
    failureFlash: true
}));

//Login
router.post('/login',auth.isNotLoggedIn,  (req, res, next) => {
    passport.authenticate('login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.post('/edit_pass', auth.isLoggedIn, authCtr.editPassword);


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