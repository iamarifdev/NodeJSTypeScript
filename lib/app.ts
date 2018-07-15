import * as express from 'express';
import * as bodyParser from 'body-parser';
import index from './routers/index';
import product from './routers/product';
import demo from './routers/demo';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config = (): void => {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    };

    private routes = (): void => {
        this.app.use('/products', product);
        this.app.use('/demo', demo);
        this.app.use('/', index);
    };
}

export default new App().app;