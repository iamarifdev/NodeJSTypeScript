import * as passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import config from './../config';
import User from './../entities/user';
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({ email: email }, (error, user: any) => {
        if(error) return done(error);
        if(!user) return done(null, false);        
        user.comparePassword(password, (error, isMatch) => {
            if(error) return done(error);
            if(!isMatch) return done(null, false);
            return done(null, user);        
        });
    });
});

const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (error, user) => {
        if(error) return done(error, false);
        if(user) done(null, user);
        else done(null, false);
    });
});

passport.use(jwtLogin);
passport.use(localLogin);
