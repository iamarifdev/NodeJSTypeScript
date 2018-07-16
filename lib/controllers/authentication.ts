import * as jwt from 'jwt-simple';
import User from '../entities/user';
import config from './../config';
import { Request, Response, NextFunction } from 'express';

class Authentication {

    private tokenForUser = (user): string => {
        const timeStamp = new Date().getTime();
        return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
    };

    public signIn = (req: Request, res: Response, next: NextFunction) => {
        res.json({ token: this.tokenForUser(req.user) });
    };

    public signUp = (req: Request, res: Response, next: NextFunction) => {
        const email = req.body.email;
        const password = req.body.password;
        if(!email || !password) return res.status(422).send({ error: 'You must provide email and password' });
        User.findOne({ email }, (error, existingUser) => {
            if(error) return next(error);
            if(existingUser) return res.status(422).send({ error: 'Email in use' });
            const user = new User({ email, password });
            user.save((error) => {
                if(error) return next(error);
                res.json({ token: this.tokenForUser(user) });
            });
        });
    };
}

export default new Authentication();