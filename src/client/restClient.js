const client = require('./client');
async function getProducto(nombre) {
    // direct way
    const resultado = await client.get("http://localhost:3000/api/product/" + nombre);
    if (resultado) {
        return resultado;
    }
    return 'No se encontraron resultados'
}

module.exports = { getProducto }