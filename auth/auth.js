const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JWTstrategy } = require('passport-jwt');
const { ExtractJwt: ExtractJWT } = require('passport-jwt');

const userRepository = require('../db/user_repo');
const { hashPassword, isValidPassword } = require('../utils/bcrypt');

passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'name',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, name, password, done) => {
            try {
                const hashedPassword = hashPassword(password);
                const user = await userRepository.createNewUser(name, hashPassword);

                return done(null, user);
            } catch (error) {
                done(error);
            }
        },
    ),
);

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'name',
            passwordField: 'password',
        },
        async (name, password, done) => {
            try {
                const user = await userRepository.getUserByName(name);

                if (!user) {
                    return done({ statusCode: 401 }, null);
                }

                // make db request?
                const validate = await isValidPassword();

                if (!validate) {
                    return done({ statusCode: 401 }, null);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        },
    ),
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                return done(error);
            }
        },
    ),
);
