const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(8082);

io.on('connection', (socket) => {
	console.log('connected on server');

	socket.emit('connected');

	socket.on('received', (data) => {
		console.log(data);
	});

	socket.on('dice-roll', (callbackFn) => {
		console.log(`Socket received request for dice-roll`);
		callbackFn({prop1: 'prop1', prop2: 'prop2'});
	})
});
