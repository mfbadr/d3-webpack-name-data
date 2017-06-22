var express = require('express');
var morgan = require('morgan');
var port = process.env.PORT || 8080;
var app = express();

app.use(morgan('dev'));

app.use(express.static('.'));

app.listen(port, function(){
    console.log('Node listening on port ' + port);
});

