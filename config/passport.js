'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const EXPIRATION = 60*24;
const SECRET = process.env.JWT_SECRET_TOKEN || 'thisIsAVerySecretToken';
const ALGORITHM = 'HS256';
const ISSUER = process.env.JWT_ISSUER || ''; // This is optional
const AUDIENCE = process.env.JWT_AUDIENCE || ''; // This is optional

const LOCAL_CONFIGURATION = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
};

const JWT_CONFIGURATION = {
  secretOrKey: SECRET,
  issuer: ISSUER,
  audience: AUDIENCE,
  passReqToCallback: false,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

/**
 * This function is triggered when a user authenticates with the local strategy.
 * @param {String} email The authenticating user's email.
 * @param {String} password The authenticating user's password.
 * @param {Function} next The callback function.
 * @returns {Promise.<*>}
 * @private
 */
const _onLocalStrategyAuth = async (email, password, next) => {
  try {
    const foundUser = await User.findOne({email: email});
    if (!foundUser) {
      return next(null, false, {
        code: 'E_USER_NOT_FOUND',
        message: `No user found matching the given email ${email}`
      });
    }
    if (!CipherService.comparePasswords(password, foundUser.password)) {
      return next(null, false, {
        code: 'E_WRONG_PASSWORD',
        message: `The given password does not match ${email}'s password`
      });
    }
    return next(null, foundUser, {});
  }
  catch (err) {
    return next(null, false, {});
  }
};

/**
 * This function is triggered when a user authenticates with the Jwt strategy.
 * @param {Object} payload The authenticating user's payload.
 * @param {Function} next The callback function.
 * @returns {Promise.<*>}
 * @private
 * @todo Document the payload
 */
const _onJwtStrategyAuth = async (payload, next) => {
  const payloadUser = payload.user;
  try {
    const foundUser = await User.findOne(payloadUser);
    if (!foundUser) {
      return next(null, false, {
        code: 'E_USER_NOT_FOUND',
        message: `No user found matching the given payload ${payload}`
      });
    }
    return next(null, foundUser, {});
  }
  catch (err) {
    return next(null, false, {});
  }
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const foundUser = await User.findOne(id);
    return done(null, foundUser);
  }
  catch (err) {
    return done(err);
  }
});

passport.use(new LocalStrategy(LOCAL_CONFIGURATION, _onLocalStrategyAuth));
passport.use(new JwtStrategy(JWT_CONFIGURATION, _onJwtStrategyAuth));

module.exports.jwt = {
  expiration: EXPIRATION,
  secret: SECRET,
  algorithm: ALGORITHM,
  issuer: ISSUER,
  audience: AUDIENCE
};
