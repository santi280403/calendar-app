import { Request, Response } from 'express';

import helpers from '../lib/helpers';
import pool from '../database';

class AuthRoutes {

    getSignup(req: Request, res: Response) {

        res.render('forms/register');
        console.log(req.isAuthenticated());

    }

    getLogin(req: Request, res: Response) {
        res.render('forms/login');
    }

    async editPassword(req: Request, res: Response) {

        const { valueIn } = req.body;

        const password = await helpers.ecryptPassword(valueIn);

        await pool.query('UPDATE users SET password = ?', [password]);

        res.send('Password Updated Successfully');

    }

}

const auth = new AuthRoutes();

export default auth;