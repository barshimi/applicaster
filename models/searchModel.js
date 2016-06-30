'use strict';

var moment = require('moment');

module.exports = {
  /**
   * fetch users by hashtag sort by followers_count
   * @param  {object} mongo [app mongo pool connection]
   * @param  {string} hashtag
   * @return {array}  mongo results
   */
  fetchUsersByHashtag: (mongo, hashtag) => new Promise((resolve, reject) => {
    mongo.collection('tweets').aggregate([
      { $project: {
        id: 1,
        lang: 1,
        text: 1,
        user_id: 1,
        created_at: 1,
        entities:
          {
            $filter: {
              input: '$entities.hashtags',
              as: 'item',
              cond: {$eq: ['$$item', hashtag]}
            }
          }
        }
      },
      {
        $lookup:
          {
            from: "users",
            localField: "user_id",
            foreignField: "id",
            as: "user"
          }
      },
      {
        $sort:
          {
            "user.followers_count" : -1
          }
      },
      {
        $limit: 5
      }

    ], (err, res) => {
      if (err) reject(err);

      resolve(res);
    });
  }),

  /**
   * add to query collection document of query request with searched hashtag
   * @param  {object} mongo [app mongo pool connection]
   * @param  {string} hashtag
   * @return {object} insertion result
   */
  createQueryRequests: (mongo, hashtag) => new Promise((resolve, reject) => {
    let queryStr = module.exports.buildQueryStr(hashtag, 'find');
    mongo.collection('queries').insert({
      "created_at": moment(new Date()).format('ddd MMM DD HH:mm:ss ZZ YYYY'), // "Wed Aug 27 13:08:45 +0000 2008"
      "query_str": queryStr,
      "query_type": hashtag
    }, (err, res) => {
      if (err) reject(err);
      if(!res.result.hasOwnProperty('ok') || res.result.ok === 0) resolve({status: 'problem with mongo'});

      return resolve({status: res.result.ok});
    })
  }),

  /**
   * build query string
   * @param  {string} hashtag
   * @param  {string} queryType
   * @return {string}
   */
  buildQueryStr: (hashtag, queryType) => {
    return `${queryType} all users using hashtag:#${hashtag}`;
  },

  /**
   * fetch queries from db by searched hashtag
   * @param  {object} mongo [app mongo pool connection]
   * @param  {string} hashtag
   * @return {array}  results
   */
  fetchQueryRequests: (mongo, hashtag) => new Promise((resolve, reject) => {
    mongo.collection('queries').aggregate([
      {
        $match:
          {
            query_type: hashtag
          }
      }
    ], (err, res) => {
      if (err) reject(err);

      resolve(res);
    })
  })
}
