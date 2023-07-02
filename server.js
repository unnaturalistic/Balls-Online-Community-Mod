// Logging with time
function log(message) {
    let time = new Date().toUTCString();
    console.log(`[${time}]`, message);
}

// Initial variables
const _port = process.env.PORT || 8089;
const ws = require('ws');
const WSServer = ws.Server;
const server = new WSServer({ port: _port });

// It's working!
console.log("Running on port " + _port);

// Client: an instance containing player variables that the server and the computer controls
// Player: a sentient or artificial being controlling the client
let clients = [];
let players = {};

// This is the default username regex - you can use this if you want.
let regex = /([^a-z0-9 _\-\+?!.:,$€Łß\/\\\(\)\{\}\[\]\<\>á-ź])+/gi;

let hex = [..."abcdef0123456789"];

const broadcast = data => {
    for (let i = 0; i < clients.length; i++) clients[i].send(data);
};

const broadcastExceptClient = (client, data) => {
    for (let i = 0; i < clients.length; i++) if (clients[i] != client) clients[i].send(data);
};

// Note: use c.send() for sending something only to the client, broadcast() for sending something to everyone, and broadcastExceptClient() to everyone except our client

const clamp = (int, min, max) => {
    return Math.min(Math.max(int, min), max);
};

const randomHex = () => { return hex[Math.floor(Math.random() * hex.length)] };

/*
    0   air
    1   door
    2   glass
    3   wall
*/
const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 3, 3, 1, 1, 3, 3, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 3, 3, 2, 2, 3, 3, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
];
//Map Size: 16x9
const map2 = [
    [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0,],
    [0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 3, 2, 3, 0, 0, 0,],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0,],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 2, 1, 2, 3, 3, 3,],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,],
];
const emptymap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
];
server.on('connection', c => {
    // Put the client into our client list
    clients.push(c);

    // Generate a random ID (this variable will only be accessible in this client instance)
    let id = "";
    for (let i = 0; i < 6; i++) id += randomHex();

    // Put our player into our player list
    players[id] = { x: 1280 / 2, y: 720 / 2, prevX: 1280 / 2, prevY: 720 / 2, moved: performance.now() };

    log(`${id} joined!`);

    // Send initial data to our client
    c.send(JSON.stringify(["id", id]));
    c.send(JSON.stringify(["time", Math.floor(performance.now())]));
    c.send(JSON.stringify(["ping"]));
    c.send(JSON.stringify(["map", map]));

    // Send a welcoming message as "Server" to our client
    c.send(JSON.stringify(["message", "Server", `Welcome to my custom server!`]));

    // Spawn all players on the server for the client (except our player)
    for (let i = 0; i < Object.keys(players).length; i++) {
        let player = players[Object.keys(players)[i]];

        // If player isn't our player, spawn that player for our client
        if (Object.keys(players)[i] != id) c.send(JSON.stringify(["spawn", Object.keys(players)[i], player.x, player.y]));
    }

    // Inform everyone except our client that our player has joined
    broadcastExceptClient(c, JSON.stringify(["message", "Server", `${id} joined`]));

    // Spawn player for everyone, including our client
    broadcast(JSON.stringify(["spawn", id, players[id].x, players[id].y]));

    // Upon receiving data
    c.on('message', msg => {
        let data;

        // Parse our data
        try {
            data = JSON.parse(msg);
        } catch (e) {
            log(e);
            data = ["none"];
        }

        // Do something based on the data type
        switch (data[0]) {
            case "move":
                // Check if the player moved after the 50ms limit
                if (players[id].moved + 50 < performance.now()) {
                    [players[id].prevX, players[id].prevY] = [players[id].x, players[id].prevY];
                    [players[id].x, players[id].y] = [clamp(Math.floor(data[1]), 0, 1280 - 16), clamp(Math.floor(data[2]), 0, 720 - 16)];

                    // Send the player's position to other players - not our player, because our client doesn't need to know it for now
                    broadcastExceptClient(c, JSON.stringify(["move", id, players[id].x, players[id].y]));
                }
                break;

            case "ping":
                // Pong!
                c.send(JSON.stringify(["ping"]));
                break;

            case "message":
                // If the message is a command... else...
                if (data[1][0] === "/") {
                    let vars = data[1].slice(1, data[1].length).split(" ");
                    
                    // If there is no command specified... else...
                    if (vars.length < 1) c.send(JSON.stringify(["message", "/", `Specify a command.`])); else {
                        // Check what command it is
                        switch (vars[0].toLowerCase()) {
                            case "name":
                                // If there is no name specified... else...
                                if (vars.length < 2) c.send(JSON.stringify(["message", "/", `Specify the name.`])); else {
                                    // Slice the username, and use the regex
                                    let newName = vars.slice(1).join(" ").slice(0, 20).replace(regex, "");

                                    // If name is used... else...
                                    if (Object.keys(players).indexOf(newName) < 0) {
                                        // Check if someone wants to play a little joke on somebody (using the Server name)... else...
                                        if (vars[1].indexOf("Server") === 0) c.send(JSON.stringify(["message", "/", `Hey, you can't just do that...`])); else {
                                            let tempPlayer = players[id]; // Save the old player
                                            delete players[id]; // Remove the old ID from the player list
                                            let oldId = id; // Save the old ID
                                            id = newName; // Use the new ID

                                            // Reset our player, using the new ID
                                            players[id] = {x: tempPlayer.x, y: tempPlayer.y, prevX: tempPlayer.prevX, prevY: tempPlayer.prevY, moved: tempPlayer.moved};

                                            // Send a rename packet to everyone
                                            broadcast(JSON.stringify(["rename", oldId, id]));

                                            // Inform others that our client has changed its ID
                                            broadcastExceptClient(c, JSON.stringify(["message", "Server", `${oldId} changed their name to ${id}.`]))

                                            // Inform the client that its ID was changed succesfully
                                            c.send(JSON.stringify(["message", "/", `Changed your name to ${id}.`]));

                                            log(`${oldId} changed their ID to ${id}`);
                                        }
                                    } else c.send(JSON.stringify(["message", "/", `That name is already used.`])); // Inform client that the ID is already used
                                }
                                break;
                            case "changemap":
                                broadcast(JSON.stringify(["map", emptymap]))
                                broadcast(JSON.stringify(["map", map2]))
                                break;
                        }
                    }
                } else {
                    // Slice our message to only 64 characters
                    let message = data[1].slice(0, 64);
                    broadcast(JSON.stringify(["message", id, message.toString()]));
                    log(id + ": " + message.toString())
                }

                break;

            case "draw":
                // If the player isn't on the same location, draw
                if (players[id].x !== players[id].prevX || players[id].y !== players[id].prevY) broadcast(JSON.stringify(["draw", players[id].x, players[id].y]));
                break;
        }
    });

    // Upon the client disconnecting
    c.on('close', () => {
        broadcast(JSON.stringify(["despawn", id])); // Send a despawn packet

        delete players[id]; // Remove the player from the player list
        clients.splice(clients.indexOf(c), 1); // Remove the client from the client list

        log(`${id} disconnected!`);
        broadcast(JSON.stringify(["message", "Server", `${id} left`])); // Inform everyone that the client left
    });

    // Upon receiving an error
    c.onerror = (e) => {
        log('An error has occured.');
        console.log(e);
    }
});