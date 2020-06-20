const io = require('socket.io')(8082);

// temporary variable
let foundrySocket;

/**
 * Create the /foundry namespace. This is where sockets connect from the Foundry game add-on
 */
const foundryNsp = io.of('/foundry');
foundryNsp.on('connection', socket  => {
	console.log(`Socket server - client '${socket.id}' connected to foundry namespace`);
	foundrySocket = socket;
});

/**
 * Create the default namespace. This is where the HTTP server connects
 */
io.on('connection', (socket) => {
	console.log(`Socket server - client '${socket.id}' connected to default namespace`);

	socket.on('dice-roll', async (callbackFn) => {
		console.log(`Socket server - received request for 'dice-roll'`);
		const addOnResponse = await new Promise(resolve => foundrySocket.emit('addon-dice-roll', result => resolve(result)));
		console.log(`Socket server received roll response ${addOnResponse}`);
		callbackFn(addOnResponse);
	})
});
