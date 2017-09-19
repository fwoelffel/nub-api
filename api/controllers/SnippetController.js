'use strict';

/**
 * NubController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  getByShortId: async (req, res) => {
    try {
      const snippet = await Snippet.findOne({
        shortId: req.param('shortId')
      });
      if (snippet) {
        res.status(200).json({
          data: snippet
        });
      }
      else {
        res.status(404).json({
          data: null
        });
      }
    }
    catch (err) {
      res.status(500).json({
        error: err
      });
    }
  }

};

