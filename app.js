'use strict';
/**
 * main app script, initial application server
 */
var config = require('./lib/app_constants'),
    cors = require('koa-cors'),
    convert = require('koa-convert'),
    bodyParser = require('koa-bodyparser'),
    mongo = require('koa-mongo'),
    debug = require('debug')('koa:app'),
    Router = require('koa-router')(),
    koa = require('koa'),
    co = require('co'),
    app = new koa();


/**
 * Initiates a new APP server. Returns a promise.
 */
app.init = co.wrap((ctx, next) => {

   /**
    * create a global mongo db connection
    */
   app.use(convert(mongo({
     host: 'localhost',
     port: 27017,
     db: 'applicaster',
     max: 100,
     min: 1,
     timeout: 30000,
     log: false
   })));

   app.use(convert(cors({
      maxAge: config.app.hasOwnProperty("cacheTime") ? config.app.cacheTime / 1000 : 0,
      credentials: true,
      methods: 'GET, HEAD, OPTIONS, PUT, POST, DELETE',
      headers: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
   })));

   /**
   *  a body parser base on co-body
   */
   app.use(convert(bodyParser()));

   /**  router **/
    Router
      // list of the top 5 most influential people talking about that hashtag || http://localhost:2500/search/hashtag?q=tag1
      .get('/search/hashtag', require('./controllers/searchCtrl').UsersByHashtag)
      // list of searches made through API by hashtag || http://localhost:2500/search/queries?q=tag1
      .get('/search/queries', require('./controllers/searchCtrl').QueriesByHashtag)
      .get('/*', (ctx, next) => {
        ctx.set('Content-Type', 'application/json');
        ctx.status = 302;
        ctx.body = { status: "Not Allowed"};
      });

    app
      .use(Router.routes())
      .use(Router.allowedMethods());

   // create http server and start listening for requests
   app.server = app.listen(config.app.port);
   if (config.app.env !== 'test') {
     console.log('server:app - APP listening on port ' + config.app.port);
   }
});

// auto init if this app is not being initialized by another module (i.e. using require('./app').init();)
if (!module.parent) {
  app.init();
  app.on('error', function(err){
     console.log(err.message);
  });
}

module.exports = app;
