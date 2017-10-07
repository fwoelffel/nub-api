'use strict';

/**
 * NubController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
   * @api {get} /snippets/:id Get the snippet matching the given id.
   * @apiName GetSnippet
   * @apiGroup Snippets
   *
   * @apiParam {String} id A snippet short id.
   *
   * @apiSuccess (200) {Object} data The response payload object.
   * @apiSuccess (200) {String} data.name The snippet name.
   * @apiSuccess (200) {String} data.description The snippet description.
   * @apiSuccess (200) {String} data.content The snippet content.
   * @apiSuccess (200) {String} data.id The snippet id.
   * @apiSuccess (200) {String} [data.owner] The snippet owner id.
   */
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

