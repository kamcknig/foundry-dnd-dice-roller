const io = require('socket.io')(8082);

/**
 * A Map of the socket connections from mobile applications.
 * Keys are the socket IDs and values are the Foundry User intance
 * _ids
 */
let mobileConnections = new Map();

/**
 * A Map of the socket connections from Foundry applications.
 * Keys are the socket IDs and values are the Foundry User intance
 * _ids
 */
let foundryConnections = new Map();

/**
 * A Map of Foundry User instances
 */
let foundryUsers = new Set();

function getFoundrySocketIdByUserId(userId) {
	const entries = foundryConnections.entries();
	let entry = entries.next();
	while (!entry.done) {
		if (entry.value[1] === userId) {
			return entry.value[0];
		}
		entry = entries.next();
	}
	return undefined;
}

// Create the mobile namespace. Mobile applications connect to this namespace
const mobileNsp = io.of('/mobile');

/**
 * Listens for connections on the mobile namespace.
 */
mobileNsp.on('connection', socket => {
	console.log(`mobile app ${socket.id} as connected to server`);

	// listen for mobile applications disconnecting from the server and remove it from the mobile
	// connections Map
	socket.on('disconnect', reason => {
		console.log(`'${socket.id}' disconnected from default namesapce`);
		console.log(`Reason '${reason}'`);

		// get the userId if any associated with this socket
		const userId = mobileConnections.get(socket.id);

		const u = Array.from(foundryUsers).find(u => u._id === userId);
		if (u) {
			u.selected = false;
		}

		mobileNsp.emit('user-list', Array.from(foundryUsers).filter(u => !u.selected));
		mobileConnections.delete(socket.id);
	});

	// listen for the request-user-list event from the mobile application and respond
	// with the list of users
	socket.on('request-user-list', () => {
		console.log(`${socket.id} requested user list`);
		socket.emit('user-list', Array.from(foundryUsers).filter(u => !u.selected));
	});

	socket.on('user-selected', userId => {
		console.log(`Mobile socket ${socket.id} selected user ${userId}`);

		const u = Array.from(foundryUsers).find(u => u._id === userId);
		if (u) {
			u.selected = true;
		}

		mobileConnections.set(socket.id, userId);
		mobileNsp.emit('user-list', Array.from(foundryUsers).filter(u => !u.selected));
	});

	// listen for the request-roll event from the mobile application
	socket.on('request-roll', async callbackFn => {
		console.log(`Received request for dice roll from '${socket.id}'`);

		const userId = mobileConnections.get(socket.id);
		const foundrySocketId = getFoundrySocketIdByUserId(userId);
		const foundrySocket = foundryNsp.connected[foundrySocketId];

		const result = await new Promise(async resolve => {
			console.log(`emitting 'foundry-roll' event to foundry socket ${foundrySocketId}`);
			const result = await new Promise(resolve => foundrySocket.emit('foundry-roll', result => resolve(result)));
			resolve(result);
		});

		console.log(`Received result from foundry`);
		callbackFn(typeof result === 'object' ? result : { result: { total: result } });
	});
});

// create the foundry namespace. FOundry application add-ons connect to this namespace
const foundryNsp = io.of('/foundry');

foundryNsp.on('connection', socket => {
	console.log(`foundry app '${socket.id}' has connected to server`);

	// listen for the add-user event. This event is fired from the foundry app when a user logs in.
	socket.on('add-user', user => {
		console.log(`Received new user ${user}`);
		foundryUsers.add(user);
		foundryConnections.set(socket.id, user._id);
		mobileNsp.emit('user-list', Array.from(foundryUsers).filter(u => !u.selected));
	});

	socket.on('disconnect', reason => {
		console.log(`foundry app '${socket.id}' has disconnected from server. '${reason}'`);

		const userId = foundryConnections.get(socket.id);

		// todo: When a user disconnects from foundry. If a mobile user
		// had selected/connected to a foundry user and then they disconnect
		// from foundry, need to remove any functionality that hooks into foundry
		const u = Array.from(foundryUsers).find(u => u._id === userId)
		if (u) {
			u.selected = false
			foundryUsers.delete(u);
		}

		foundryConnections.delete(socket.id);
		mobileNsp.emit('user-list', Array.from(foundryUsers.values()).filter(u => !u.selected));
	});
});
