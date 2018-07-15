import * as express from 'express';
import { Request, Response } from 'express';

const product = express.Router();

product.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        count: 0,
        data: []
    });
});

product.post('/add', (req: Request, res: Response) => {
    const data = req.body;
    res.status(200).send(data);
});

export default product;