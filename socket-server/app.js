const io = require('socket.io')(8082);

let connections = new Map();

let users = new Map();

/**
 * Create the default namespace. This is where the mobile devices connect
 */
io.on('connection', async (socket) => {
	console.log(`Socket server - client '${socket.id}' connected to default namespace`);
	connections.set(socket.id, socket);

	socket.on('disconnect', reason => {
		console.log(`Socket server - '${socket.id}' disconnected from default namesapce`);
		console.log(`Reason '${reason}'`);
		connections.delete(socket.id);
	});

	// send the user list to the connected device
	socket.emit('user-list', Array.from(users.values()));

	socket.on('request-roll', async callbackFn => {
		console.log(`Socket server - Received request for dice roll from '${socket.id}'`);

		// right now it loops through and emits to all foundry instances. Which while testing is simply
		// one instance. need to be able to 'connect' the phone app to the identity in game
		const result = await new Promise(async resolve => {
			let result = 0;
			for(const [id, socket] of foundryConnections.entries()) {
				console.log(`Socket server - emitting 'foundry-roll' to foundry namespace connections`);
				result = await new Promise(resolve => socket.emit('foundry-roll', result => resolve(result)));
			};

			resolve(result);
		});

		console.log(`Socket server - Received result from foundry`);
		callbackFn(typeof result === 'object' ? result : { result: { total: result } });
	});
});

let foundryConnections = new Map();

const foundryNsp = io.of('/foundry');

foundryNsp.on('connection', socket => {
	console.log(`Socket server - foundry app '${socket.id}' has connected to server`);
	foundryConnections.set(socket.id, socket);

	// when a foundry app connects, add that foundry instance's user to the list of users
	socket.on('add-user', user => {
		console.log(`Socket server - Received new user ${user}`);
		users.set(socket.id, user);

		// emit the new user list to all phone connections
		for (const [id, socket] of connections) {
			socket.emit('user-list', Array.from(users.values()));
		}
	});

	socket.on('disconnect', reason => {
		console.log(`Socket server - foundry app '${socket.id}' has disconnected from server`);
		users.delete(socket.id);
		foundryConnections.delete(socket.id);

		for (const [id, s] of connections) {
			// send the user list to the connected device
			s.emit('user-list', Array.from(users.values()));
		}
	});
});
