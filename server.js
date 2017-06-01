'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = 'postgres://postgres:1234@localhost:5432/postgres';
// const conString = process.env.DATABASE_URL || 'postgres://localhost:5432';
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./Public'));

function proxyGitHub(request, response) {
  console.log('Routing usno request for', request.params[0]);
  (requestProxy({
    url: `http://api.usno.navy.mil/${request.params[0]}`,
  }))(request, response);
}
app.get('/usno/*', proxyGitHub);

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
