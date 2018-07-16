import * as express from 'express';
import { Request, Response } from 'express';
import { requireAuth } from './../utils/attribute';

const product = express.Router();

product.get('/', requireAuth, (req: Request, res: Response) => {
    res.status(200).send({
        count: 0,
        data: []
    });
});

product.post('/add', requireAuth, (req: Request, res: Response) => {
    const data = req.body;
    res.status(200).send(data);
});

export default product;