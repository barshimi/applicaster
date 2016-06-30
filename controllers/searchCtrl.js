'use strict';

let searchModel = require('../models/searchModel');

module.exports = {
  /**
   * fetch list of the top 5 most influential people talking about hashtag
   * @param  {object}   ctx  [application object]
   * @param  {Function} next
   * @return {string}
   */
  UsersByHashtag: async (ctx, next) => {
    try {
      console.time('UsersByHashtag');
      if (!ctx.query.hasOwnProperty("q") || ctx.query.q.length == 0) return ctx.body = await { status : "missings params" };

      let hashTag = ctx.query.q;
      let res = await Promise.all([searchModel.fetchUsersByHashtag(ctx.mongo, hashTag), searchModel.createQueryRequests(ctx.mongo, hashTag)]);

      ctx.status = 200;
      ctx.body = JSON.stringify(res);
      console.timeEnd('UsersByHashtag');
    } catch (err) {
      ctx.status = 500;
      ctx.body = await { message: err.message };
    }
  },

  /**
   * list of searches made through API by hashtag
   * @param  {object}   ctx  [application object]
   * @param  {Function} next
   * @return {string}
   */
  QueriesByHashtag: async (ctx, next) => {
    try {
      console.time('QueriesByHashtag');
      if (!ctx.query.hasOwnProperty("q") || ctx.query.q.length == 0) return ctx.body = await { status : "missings params" };

      let hashTag = ctx.query.q.toLowerCase();
      let res = await searchModel.fetchQueryRequests(ctx.mongo, hashTag);

      ctx.status = 200;
      ctx.body = JSON.stringify(res);
      console.timeEnd('QueriesByHashtag');
    } catch (err) {
      ctx.status = 500;
      ctx.body = await { message: err.message };
    }
  }
};
