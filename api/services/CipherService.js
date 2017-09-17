'use strict';

const util = require('util');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports = {

  /**
   * This function returns a new user object with hashed password.
   * @param {Object} user The user object which password has to be hashed.
   * @returns {Promise.<Object>} This promise resolves with a new user object.
   */
  hashPassword: async (user) => {
    const pHash = util.promisify(bcrypt.hash);
    if (user.password) {
      return {
        ...user,
        password: await pHash(user.password)
      };
    }
    return {
      ...user
    };
  },

  /**
   * This function compares the given password with the registered password for the given user.
   * @param {String} password The password to be verified.
   * @param {Object} user The user object containing the reference password.
   * @returns {Promise.<boolean>} This promise resolves with true if the passwords match.
   */
  comparePassword: async (password, user) => {
    const pCompare = util.promisify(bcrypt.compare);
    return await pCompare(password, user.password);
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
