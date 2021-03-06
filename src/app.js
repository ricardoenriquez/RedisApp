var express =require('express');
var { json } =require('express');
var morgan =require('morgan');

//Importamos las rutas
var productRoutes = require('./routes/productRedis');

var app = express();

//middleware

app.use(morgan('dev'));
app.use(json());

//routes
app.use('/redis/product',productRoutes);
app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
  })

module.exports=app;