'use strict';

const sails = require('sails');
before((done) => {
  sails.lift({
    log: {
      level: 'warn'
    },
    models: {
      migrate: 'drop'
    }
  }, (err) => {
    if (err) {
      return done(err);
    }
    return done();
  });
});

after((done) => {
  sails.lower(done);
});
