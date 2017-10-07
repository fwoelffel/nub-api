'use strict';

const jwt = require('jsonwebtoken');
const util = require('util');
const passport = require('passport');

module.exports = {

  /**
   * This function creates a JWT for the given user.
   * @param {Object} user The user payload to which
   * @returns {Promise.<String>} This promise resolves with the created token.
   */
  createToken: async (user) => {
    const pSign = util.promisify(jwt.sign);
    return await pSign(
      {
        user: user.toJSON()
      },
      sails.config.jwt.secret,
      {
        algorithm: sails.config.jwt.algorithm,
        expiresIn: sails.config.jwt.expiration,
        issuer: sails.config.jwt.issuer,
        audience: sails.config.jwt.audience
      }
    );
  }

};
