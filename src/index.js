var app = require('./app');
require('@babel/polyfill');

async function main(){
    await app.listen(4000);
    console.log('Servidor creado por el puerto 4000');
}

main();