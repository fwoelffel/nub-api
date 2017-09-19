'use strict';

const mime = require('mime-types');
const shortid = require('shortid');

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
      type: 'string',
      defaultsTo: ''
    },
    content: {
      type: 'string',
      defaultsTo: ''
    },
    owner: {
      model: 'user'
    },
    shortId: {
      type: 'string',
// When using sails-disk, any attribute with `unique: true` must also have `required: true`
// Commenting out the next line will trigger errors when using sails-disk
//      unique: true
    }
  },
  customToJSON: function () {
    const obj = {
      ...this,
      mime: mime.lookup(this.name)
    };
    obj.id = obj.shortId;
    delete obj.shortId;
    return obj;
  },
  beforeCreate: (values, next) => {
    values.shortId = shortid.generate();
    return next();
  }

};

