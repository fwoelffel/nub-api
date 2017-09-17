'use strict';

const mime = require('mime-types');

/**
 * Nub.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    schema: true,
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'longtext'
    },
    content: {
      type: 'longtext'
    },
    owner: {
      model: 'user'
    },
    customToJSON: () => {
      const obj = {
        ...this,
        mime: mime.lookup(this.name)
      }
    }

  },

};

