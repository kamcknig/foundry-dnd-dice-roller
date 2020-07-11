import { Socket, Namespace, Server } from "socket.io";
import { Connection, User, JournalEntry, Macro } from "./connection.model";

const io: Server = require('socket.io')(8082);

// Create the mobile namespace. Mobile applications connect to this namespace
const mobileNsp: Namespace = io.of('/mobile');

/**
 * Listens for connections on the mobile namespace.
 */
mobileNsp.on('connection', (mobileSocket: Socket) => {
	console.log(`Mobile app '${mobileSocket.id}' connected to server`);

	// listen for mobile applications disconnecting from the server and remove it from the mobile
	// connections Map
	mobileSocket.on('disconnect', (reason: string) => {
		console.log(`'${mobileSocket.id}' disconnected from mobile namesapce '${reason}'`);

		try {
			const connection = getConnFromMobileSocket(mobileSocket);
			connections.get(connection.foundrySocket.id).mobileSocket = null;
		}
		catch (e) {
			console.log(`Mobile app '${mobileSocket.id}' not found in foundry connections`);
			console.log(e);
		}

		mobileNsp.emit('user-list', usersAsArray());
	});

	// listen for the request-user-list event from the mobile application and respond
	// with the list of users
	mobileSocket.on('request-user-list', () => {
		const users = usersAsArray();
		console.log(`'${mobileSocket.id}' requested user list. Sending 'user-list' with ${users.length} users`);
		mobileSocket.emit('user-list', users);
	});

	mobileSocket.on('token-entered', (token: string, callbackFn: Function) => {
		console.log(`Mobile socket '${mobileSocket.id}' entered token '${token}'`);

		const connection = getConnFromToken(token);
		if (connection) {
			connection.mobileSocket = mobileSocket;
			callbackFn(connection.user);
		}
		else {
			callbackFn();
		}
	});

	// listen for the request-roll event from the mobile application
	mobileSocket.on('request-roll', async (callbackFn: Function) => {
		console.log(`Received request for dice roll from '${mobileSocket.id}'`);
		const connection = getConnFromMobileSocket(mobileSocket);
		const foundrySocket = connection.foundrySocket;
		const result = await new Promise(resolve => foundrySocket.emit('foundry-roll', (result: any) => resolve(result)));

		console.log(`Received result from foundry`);
		callbackFn(typeof result === 'object' ? result : { result: { total: result } });
	});

	mobileSocket.on('request-journal-entries', async (journalId: number = NaN, callbackFn: Function) => {
		console.log(`Received request for journal entr${journalId ? 'y' : 'ies'} ${journalId ? journalId + ' ' : ''}from ${mobileSocket.id}`);
		const connection = getConnFromMobileSocket(mobileSocket);
		const foundrySocket = connection.foundrySocket;
		const result = await new Promise(resolve => foundrySocket.emit('request-journal-entries', journalId, (result: any) => resolve(result)));
		callbackFn(result);
	});
});







// create the foundry namespace. FOundry application add-ons connect to this namespace
const foundryNsp: Namespace = io.of('/foundry');

/**
 * A Map of the socket connections from Foundry applications.
 * Keys are the socket IDs and values are the Foundry User intance
 * _ids
 */
let connections = new Map<string, Connection>();

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
	connections.set(socket.id, { foundrySocket: socket, token });
	socket.emit('send-token', token);

	// listen for the add-user event. This event is fired from the foundry app when a user logs in.
	socket.on('add-user', (user: User, macros: Macro[]) => {
		console.log(`Received new user '${user._id}'`);
		user.macros = macros;
		connections.get(socket.id).user = user;
		mobileNsp.emit('user-list', usersAsArray());
	});

	socket.on('disconnect', reason => {
		console.log(`foundry app '${socket.id}' has disconnected from server. '${reason}'`);
		connections.delete(socket.id);
		mobileNsp.emit('user-list', usersAsArray());

		// TODO if the user was selected on a mobile app, probably need to send an event that the user is no longer
		// available
	});

	socket.on('update-combat-turn', (user: User) => {
		console.log(`Received 'update-combat-turn' from '${socket.id}'.`);
		connections.get(socket.id).mobileSocket.emit('update-combat-turn');
	})
});






function usersAsArray(): User[] {
	return Array.from(connections.values()).map(v => v.user);
}

function getConnFromMobileSocket(socket: Socket): Connection {
	return Array.from(connections.values()).find(v => v.mobileSocket.id === socket.id);
}

function getConnFromToken(token: string): Connection {
	return Array.from(connections.values()).find(v => v.token === token);
}