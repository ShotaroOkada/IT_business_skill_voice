'use strict';
const express = require('express');
const router = require('./router');

server(process.argv[2]);

function server(port = 8080) {
  express()
    .use(router)
    .listen(port);
}