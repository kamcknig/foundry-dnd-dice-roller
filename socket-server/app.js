const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(8082);

io.on('connection', (socket) => {
	console.log(`Socket server 'connection' event`);

	socket.on('dice-roll', (callbackFn) => {
		console.log(`Socket server - received request for 'dice-roll'`);
		callbackFn({prop1: 'prop1', prop2: 'prop2'});
	})
});
