/**
 * TODO
 *
 * List of TODOs
 * - Need to update user list in mobile app when user configuration updates such as color or name
 */

const modName = 'mobileDiceRoller';
let socket;
let chatLog;

/**
const CHAT_MESSAGE_TYPES = {
  OTHER: 0,
  OOC: 1,
  IC: 2,
  EMOTE: 3,
  WHISPER: 4,
  ROLL: 5
};
**/
Hooks.on("init", function() {
	log(`init hook`);

	CONFIG.debug.hooks = true;
	CONFIG.mobileDiceRollerDebug = true;

	const scriptRef = document.createElement('script');
	scriptRef.setAttribute('type', 'text/javascript');
	scriptRef.setAttribute('onload', 'window.socketLibraryLoaded()');
	scriptRef.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js');
	document.getElementsByTagName('head')[0].appendChild(scriptRef);

	game.settings.register('mobile-dice-roller', 'host', {
		name: 'Select a host',
		scope: 'mobile-dice-roller',
		config: true,
		default: 'http://localhost:8082'
	});
});

Hooks.on('ready', () => {
	log('ready hook');
	chatLog = window.ui.chat;
});

window.socketLibraryLoaded = () => {
	log('Socket library loaded');

	//foundry-api2.turkeysunite.com
	socket = io(`${game.settings.get('mobile-dice-roller', 'host')}/foundry`);

	socket.once('send-token', token => {
		log(`Received token '${token}'`);
		const chatData = {
      content: `Use code ${token} in the mobile app to connect.`,
      speaker: {
        scene: null, actor: null, token: null, alias: 'Foundry Mobile Companion',
      },
      whisper: [game.userId],
    };
    ChatMessage.create(chatData, {});
	});

	socket.on('connect', () => {
		log('Connected to socket server');

		socket.on('diconnect', () => log('Disconnected from socket server'));

		if (game.user) {
			let macros = [];
			for (let i = 1; i < 6; i++) {
				macros = macros.concat(game.user.getHotbarMacros(i));
			}

			socket.emit('add-user', game.user, macros);
		}

		socket.on('foundry-roll', (callbackFn) => {
			log(`Received 'founldry-roll' event`);

			const roll = new Roll("2d20").roll();
			log(`Roll result '${roll.total}'`);

			const rollMode = "public";

			roll.toMessage({
				flavor: "Mobile Roller",
				speaker: ChatMessage.getSpeaker()
			}, { rollMode });

			callbackFn(roll.total);
		});

		socket.on('request-journal-entries', (journalId, callbackFn) => {
			log(`Request for journal entries ${journalId}`);
			const entries = game.journal.entities.filter(j => j.permission > 0);
			callbackFn(entries);
		});
	});

	socket.on('disconnect', reaseon => {
		log(`Disconnected from socket server '${reaseon}'`);
	})

	socket.on('connect_error', error => {
		log(error);
	});
}

/**
 * combat - Combat instance
 * turn - turn data { turn: number, _id: number } - shows the turn number and Combat instance ID
 * data - { diff: boolean } - not sure what this means right now
 * id - number - not sure what this is the ID of right now
 */
Hooks.on('updateCombat', (combat, turn, data, id) => {
	const turnNumber = combat.current.turn;
	const turns = combat.turns;
	turn = turns[turnNumber];
	const turnPlayers = turn.players;
	const user = turnPlayers.find(u => u._id === game.user._id);
	if (user) {
		socket.emit('update-combat-turn', user);
	}
});

// Hooks.on('renderPlayerList', (playerListApp, html, users) => {
// 	socket.emit('user-list', users.users);
// });

// Hooks.on('renderChatMessage', (chatMsg, html, msgData) => {
// 	console.log(chatMsg);
// 	console.log(msgData);
// });

function log(msg) {
	if (!!CONFIG.mobileDiceRollerDebug) {
		console.log(`${modName}`);
		console.log(msg);
	}
}
