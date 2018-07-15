import * as express from 'express';
import { Request, Response } from 'express';

const demo = express.Router();

demo.get('/greetings', (req: Request, res: Response) => {
    res.status(200).send({
        message: 'Hello World!'
    });
});

export default demo;