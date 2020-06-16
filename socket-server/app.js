const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(8082);

io.on('connection', (socket) => {
	console.log('connected on server');
	socket.emit('connected', { hello: 'world' });
	socket.on('received', (data) => {
		console.log(data);
	});
});
