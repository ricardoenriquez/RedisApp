const client = require('../redis');
//const { clientRest } = require('../client/client');
//const clientRest = require('../client/restClient');
var Redis = require('ioredis');
var redis = new Redis(6379, 'localhost');



var Client = require('node-rest-client').Client;

// direct way
var clientRest = new Client();

function cache(req, res, next) {
    const name = req.params.name;
    console.log(req.params.name + '********* name ' + name);
    client.get(name, (err, data) => {
        if (err) throw err;

        if (data !== null && data != '[]') {
            res.send(setResponse(name, data));
            console.log('resultado desde cache')
        }
        else {
            console.log('resultado desde BD')
            next();
        }
    });


}

async function getRepos(req, res, next) {
    try {
        console.log("Fetching Data");
        const name = req.params.name;
        clientRest.get("http://localhost:3000/api/product/" + name, function (data) {
            console.log('*** resultado ' + JSON.stringify(data));
            client.setex(name, 3600, JSON.stringify(data));
            res.send(setResponse(name, JSON.stringify(data)));
        });

    } catch (err) {

        console.log(err);

    }
}

function setResponse(name, repos) {
    return repos;
}

function getListRedis(req, res) {
    var name = req.params.name;
    client.keys(name + '*', function (err, keys) {
        if (err) return console.log(err);

        for (var i = 0, len = keys.length; i < len; i++) {
            console.log(keys[i]);
        }
        res.json(keys);
    });
    /*
    var stream = redis.scanStream();
    var keys = [];
    stream.on('data', function (resultKeys) {
        // `resultKeys` is an array of strings representing key names
        for (var i = 0; i < resultKeys.length; i++) {

            console.log('for ', resultKeys[i]);
            keys.push(resultKeys[i]);
        }
    });
    stream.on('end', function () {
        console.log('done with the keys: ', keys);
        res.json(keys)
    });
    return keys;*/
}

module.exports = { getRepos, cache, getListRedis }