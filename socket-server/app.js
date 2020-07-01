const io = require('socket.io')(8082);

// Create the mobile namespace. Mobile applications connect to this namespace
const mobileNsp = io.of('/mobile');

/**
 * Listens for connections on the mobile namespace.
 */
mobileNsp.on('connection', mobileSocket => {
	console.log(`Mobile app '${mobileSocket.id}' as connected to server`);

	// listen for mobile applications disconnecting from the server and remove it from the mobile
	// connections Map
	mobileSocket.on('disconnect', reason => {
		console.log(`'${mobileSocket.id}' disconnected from default namesapce '${reason}'`);

		try {
			const ob = Array.from(foundryConnections.values()).find(v => v.mobileSocket.id === mobileSocket.id);
			foundryConnections.get(ob.foundrySocket.id).mobileSocket = null;
		}
		catch (e) {
			console.log(`Mobile app '${mobileSocket.id}' not found in foundry connections`);
		}

		mobileNsp.emit('user-list', Array.from(foundryConnections.values()).map(v => v.user));
	});

	// listen for the request-user-list event from the mobile application and respond
	// with the list of users
	mobileSocket.on('request-user-list', () => {
		console.log(`'${mobileSocket.id}' requested user list`);
		mobileSocket.emit('user-list', Array.from(foundryConnections.values()).map(v => v.user));
	});

	mobileSocket.on('token-entered', (token, callbackFn) => {
		console.log(`Mobile socket '${mobileSocket.id}' entered token '${token}'`);

		const ob = Array.from(foundryConnections.values()).find(v => v.token === token);
		if (ob) {
			ob.user.selected = true;
			ob['mobileSocket'] = mobileSocket;
			callbackFn(ob.user);
		}
		else {
			callbackFn();
		}
	});

	// listen for the request-roll event from the mobile application
	mobileSocket.on('request-roll', async callbackFn => {
		console.log(`Received request for dice roll from '${mobileSocket.id}'`);

		const ob = Array.from(foundryConnections.values()).find(v => v.mobileSocket.id === mobileSocket.id);
		const foundrySocket = ob.foundrySocket;

		const result = await new Promise(async resolve => {
			console.log(`emitting 'foundry-roll' event to foundry socket ${foundrySocket.id}`);
			const result = await new Promise(resolve => foundrySocket.emit('foundry-roll', result => resolve(result)));
			resolve(result);
		});

		console.log(`Received result from foundry`);
		callbackFn(typeof result === 'object' ? result : { result: { total: result } });
	});
});







// create the foundry namespace. FOundry application add-ons connect to this namespace
const foundryNsp = io.of('/foundry');

/**
 * A Map of the socket connections from Foundry applications.
 * Keys are the socket IDs and values are the Foundry User intance
 * _ids
 */
let foundryConnections = new Map();

const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234566789'
function generateToken() {
	let result = '';
	const charactersLength = characters.length;
	for (let i = 0; i < 4; i++) {
		result = result.concat(characters.charAt(Math.floor(Math.random() * charactersLength)));
	}
	return result;
}

foundryNsp.on('connection', socket => {
	console.log(`foundry app '${socket.id}' has connected to server`);

	const token = generateToken();
	foundryConnections.set(socket.id, { foundrySocket: socket, token });
	socket.emit('send-token', token);

	// listen for the add-user event. This event is fired from the foundry app when a user logs in.
	socket.on('add-user', user => {
		console.log(`Received new user ${user._id}`);
		foundryConnections.get(socket.id)['user'] = user;
		mobileNsp.emit('user-list', Array.from(foundryConnections.values()).map(v => v.user));
	});

	socket.on('disconnect', reason => {
		console.log(`foundry app '${socket.id}' has disconnected from server. '${reason}'`);
		foundryConnections.delete(socket.id);
		mobileNsp.emit('user-list', Array.from(foundryConnections.values()).map(v => v.user));

		// TODO if the user was selected on a mobile app, probably need to send an event that the user is no longer
		// available
	});
});
