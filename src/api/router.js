// 'use strict';
const fs = require('fs');
const router = require('express').Router();

router.get('/issues', file('files/Issues.json'));
router.get('/tenants', file('files/Tenants.json'));

function file(filename) {
  return (request, response) => {
    response.writeHead(200, 'OK');
    fs.createReadStream(filename).pipe(response);
  };
}

function created(request, response) {
  response.writeHead(201, 'Created');
  response.end();
}

module.exports = router;