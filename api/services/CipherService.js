'use strict';

const util = require('util');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports = {

  /**
   * This function returns a new user object with hashed password.
   * @param {String} password The password string to be hashed.
   * @returns {Promise.<Object>} This promise resolves with a new user object.
   */
  hashPassword: async (password) => {
    const pHash = util.promisify(bcrypt.hash);
    return await pHash(user.password)
  },

  /**
   * This function compares the given password with the registered password for the given user.
   * @param {String} password The password to be verified.
   * @param {String} refPassword The reference password.
   * @returns {Promise.<boolean>} This promise resolves with true if the passwords match.
   */
  comparePassword: async (password, refPassword) => {
    const pCompare = util.promisify(bcrypt.compare);
    return await pCompare(password, refPassword);
  },

  /**
   * This function
   * @param {Object} user The user payload to which
   * @returns {Promise.<String>} This promise resolves with the created token.
   */
  createToken: async (user) => {
    const pSign = util.promisify(jwt.sign);
    return await pSign(
      {
        user: user.toJSON()
      },
      this.secret,
      {
        algorithm: sails.config.jwt.algorithm,
        expires: sails.config.jwt.expiration,
        issuer: sails.config.jwt.issuer,
        audience: sails.config.jwt.audience
      }
    );
  }

};
