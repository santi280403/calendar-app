import { Request, Response, NextFunction } from 'express'

export default {
    isLoggedIn(req: Request, res: Response, next: NextFunction) {

        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login')
    },

    isNotLoggedIn(req: Request, res: Response, next: NextFunction) {

        if (!req.isAuthenticated()) {
            return next()
        }
        res.redirect('/profile');
    }
}