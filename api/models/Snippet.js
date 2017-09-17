'use strict';

const mime = require('mime-types');

/**
 * Nub.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    },
    content: {
      type: 'string'
    },
    owner: {
      model: 'user'
    }
  },
  customToJSON: function () {
    const obj = {
      ...this,
      mime: mime.lookup(this.name)
    };
    return obj;
  }

};

