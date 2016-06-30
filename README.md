# Applicaster assignment : Installation guide
Author: shimi bar.

Folder contain server based on Koa.js v2.0. System use MongoDb as database service and babel node for compiling ES6 to ES5.

  - App.js : Initial server with routes and mongodb connection pool
  - mongoDB_dump: dump db collections (tweets, queries).
  - test : test application functional behavior.
  - db : database data.
  - lib : application configuration.
  - controllers & models : logic and database query.


### Version
1.0.0

### Tech


* [Node.js] - Event-driven I/O server-side JavaScript environment based on V8.
* [Koa.js] - fast node.js network app framework
* [mongo] - noSQL database
* [babel] - compiler for ES6 syntax
* [nodemon] - Monitor for any changes in your node.js application



### Installation

Applicaster requires [Node.js](https://nodejs.org/) v5+ to run.

You need Hombrew installed:
```sh
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
You need nvm installed:
```sh
$ brew update
$ brew install nvm
$ nvm install 5.6.0
$ nvm use 5.6.0
```

You need Mongodb installed:

```sh
$ brew install mongodb --devel
```


### Start project
Run MongoDB
```sh
$ mongod  --dbpath /root/to/applicaster/db
```
After installing npm dependencies, you should setup tweets and users collections
```sh
$ rm -rf root/to/applicaster/db/
$ npm run mongo:dump
```
Setup Node environment:
```sh
$ cd to/applicaster/folder
$ npm install
$ npm run app:server
```
Test application
```sh
$ npm run test
```
License
----

MIT

   [babel]: <https://babeljs.io/>
   [mongo]: <https://www.mongodb.com/>
   [node.js]: <https://nodejs.org/en/>
   [Koa.js]: <http://koajs.com/>
   [nodemon]: <https://github.com/remy/nodemon/>


