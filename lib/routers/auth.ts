import * as express from 'express';
import { Request, Response } from 'express';
import { requireAuth, requireSignIn } from './../utils/attribute';
import Authentication from './../controllers/authentication';
const passportService =  require('./../services/passport');

const auth = express.Router();
auth.get('/', requireAuth, (req: Request, res: Response) => {
    res.status(200).send({
        message: 'Hello World!'
    });
});
auth.post('/signin', requireSignIn, Authentication.signIn);
auth.post('/signup', Authentication.signUp);

export default auth;