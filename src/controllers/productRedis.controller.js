const client = require('../redis');
//const { clientRest } = require('../client/client');
//const clientRest = require('../client/restClient');

var Client = require('node-rest-client').Client;

// direct way
var clientRest = new Client();

function cache(req, res, next) {
    const { username } = req.params;
    client.get(username, (err, data) => {

        if (err) throw err;

        if (data !== null) {
            res.send(setResponse(username, data));
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
        const { name } = req.params;
        clientRest.get("http://localhost:3000/api/product/"+name, function (data) {
            console.log('*** resultado ' + JSON.stringify(data.toString()));
            if (data) {
                client.setex(name, 3600, data).toString();
            }
            res.send(setResponse(name, data.toString()));
        });

    } catch (err) {

        console.log(err);

    }
}

function setResponse(name, repos) {
    return `<h2>${name} valor  ${repos} </h2>`;
}

module.exports = { getRepos, cache }