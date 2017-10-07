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
   *  @api {post} /auth/signup Sign up a new user.
   *  @apiName SignUp
   *  @apiGroup Authentication
   *
   *  @apiParam {String} email The user email address.
   *  @apiParam {String} username The user username.
   *  @apiParam {String} password The user password.
   *
   *  @apiSuccess (201) {Object} data The response payload.
   *  @apiSuccess (201) {Object} data.user The created user object.
   *  @apiSuccess (201) {String} data.token The created user JWT.
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
   * @api {post} /auth/signin Sign in an existing user.
   * @apiName SignIn
   * @apiGroup Authentication
   *
   * @apiParam {String} email The user's email.
   * @apiParam {String} password The user's password.
   *
   *  @apiSuccess (200) {Object} data The response payload.
   *  @apiSuccess (200) {Object} data.user The signed in user object.
   *  @apiSuccess (200) {String} data.token The signed in user JWT.
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
            data: {
              user: user,
              token: await JWTokenService.createToken(user)
            }
          });
        }
      })(req, res);
  }

};

