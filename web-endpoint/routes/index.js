const { socket } = require('../app');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log('HTTP Server - received request');
  res.set('Access-Control-Allow-Origin', '*');

  const socketResponse = await new Promise(resolve => socket.emit('dice-roll', socketResponse => resolve(socketResponse)));
  console.log(`Received response from socket ${socketResponse}`);
  res.send({ result: socketResponse });
});

module.exports = router;
