import { Request, Response } from 'express';

class ControllerIndex {

    mainView(req: Request, res: Response) {
        res.render('index')
    }

}

const controllerIndex = new ControllerIndex();

export default controllerIndex;