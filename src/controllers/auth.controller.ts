import { Request, Response } from 'express';

class AuthRoutes {

    getSignup(req: Request, res: Response) {

        res.render('forms/register');

    }

    getLogin(req: Request, res: Response) {
        res.render('forms/login');
    }

}

const auth = new AuthRoutes();

export default auth;