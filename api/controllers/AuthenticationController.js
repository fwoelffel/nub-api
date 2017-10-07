'use strict';

const passport = require('passport');

/**
 * Triggers when user authenticates via passport
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
function _onPassportAuth(req, res, error, user, info) {
  if (error) {
    return res.status(500).json({error: error});
  }
  if (!user) {
    return res.status(401).json({error: info});
  }
  else {
    return res.ok({
      token: JWTokenService.createToken(user),
      user: user
    });
  }
}

/**
 * AuthenticationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
   * `AuthenticationController.signup()`
   */
  signup: async (req, res) => {
    try {
      const createdUser = await User.create(req.body).meta({fetch: true});
      const token = await JWTokenService.createToken(createdUser);
      return res.status(201).json({
        data: {
          user: createdUser,
          token: token
        }
      });
    }
    catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  },

  /**
   * `AuthenticationController.signin()`
   */
  signin: function (req, res) {
    passport.authenticate(
      'local',
      async (error, user, info) => {
        if (error) {
          return res.status(500).json({error: error});
        }
        if (!user) {
          return res.status(401).json({error: info});
        }
        else {
          return res.ok({
            token: JWTokenService.createToken(user),
            user: user
          });
        }
      })(req, res);
  }

};

