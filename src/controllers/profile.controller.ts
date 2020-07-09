import { Request, Response } from 'express';

class Profile {

    getProfile(req: Request, res: Response) {
        res.send(req.user)
    }

}

const profile = new Profile();

export default profile;