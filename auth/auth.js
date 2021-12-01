const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JWTstrategy } = require('passport-jwt');
const { ExtractJwt: ExtractJWT } = require('passport-jwt');
