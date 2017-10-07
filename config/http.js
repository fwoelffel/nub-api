'use strict';

const passport = require('passport');

/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/

     order: [
       'cookieParser',
       'session',
      'passportInit',
      'passportSession',
       'bodyParser',
       'compress',
       'poweredBy',
       'jwtCheck',
       'router',
       'www',
       'favicon',
     ],
    passportInit: passport.initialize(),
    passportSession: passport.session(),
    jwtCheck: (req, res, next) => {
       sails.log.silly('Checking JWT.');
      passport.authenticate('jwt', (err, user) => {
        if (err) {
          sails.log.error('Failed to authenticate with JWT strategy.');
          res.status(500).json({
            error: err
          });
        }
        else if (user) {
          sails.log.silly('Updating user session.');
          req.logIn(user, (err) => {
            next(err);
          });
        }
        else {
          sails.log.silly('JWT check unsuccessful.');
          next();
        }
      })(req, res);
    }

  },

};
