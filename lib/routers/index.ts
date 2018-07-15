import * as express from 'express';
import { Request, Response } from 'express';

const index = express.Router();

index.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        message: 'Hello World!'
    });
});

index.post('/', (req: Request, res: Response) => {
    const data = req.body;
    res.status(200).send(data);
});

export default index;