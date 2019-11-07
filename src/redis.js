var redis  = require('redis');

var REDIS_PORT = process.env.REDIS_PORT || 6379;

var client = redis.createClient(REDIS_PORT); 

module.exports = client;