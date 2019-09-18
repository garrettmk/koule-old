const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

app = express();
app.use('/*', express.static(__dirname + '/build'));

const port = process.env.PORT || 5000;
app.listen(port);

console.log('Server started at port ' + port);