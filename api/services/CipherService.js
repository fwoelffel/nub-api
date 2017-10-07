'use strict';

const bcrypt = require('bcrypt');

module.exports = {

  /**
   * This function returns a hashed version of the given password.
   * @param {String} password The password string to be hashed.
   * @returns {Promise.<Object>} This promise resolves with a new user object.
   */
  hashPassword: async (password) => {
    return await bcrypt.hash(password, 15);
  },

  /**
   * This function compares the given password with the registered password for the given user.
   * @param {String} password The password to be verified.
   * @param {String} refPassword The reference password.
   * @returns {Promise.<boolean>} This promise resolves with true if the passwords match.
   */
  comparePasswords: async (password, refPassword) => {
    return await bcrypt.compare(password, refPassword);
  }

};
