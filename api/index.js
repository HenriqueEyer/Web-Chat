const express = require('express');
const app = express();
const server = require('http').createServer(app).listen(4555);
const io = require('socket.io').listen(server);
const message = require('../controllers/message');
const RoomPrivate = require('../controllers/RoomPrivate');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

let rooms = [];
let allMessage = [];
let online = [];

const logoffUser = (data, id) => {
  return data.filter((user) => user.id !== id);
}

io.on("connection", async (socket) => {
  allMessage = await message.getAll();
  rooms = await RoomPrivate.getAllRoomPrivate();
  socket.on('disconnect', () => {
    io.emit('adeus', { message: 'Poxa, fica mais, vai ter bolo :)' });
  });

  socket.on('message', async (data) => {
    const value = await message.create(data);
    allMessage.push(value)
    io.emit('messageServer', allMessage);
  });

  socket.on('logoff', async (login) => {
    online = logoffUser(online, login.id);
    io.emit('serverStatus', { chats: rooms, userOnline: online });
    io.emit('notification', `Saiu ${login.userName}!`);
  })

  socket.on('login', (login) => {
    online.push(login)
    io.emit('serverStatus', { chats: rooms, userOnline: online });
    io.emit('notification', `Entrou ${login.userName}!`);
    io.emit('messageServer', allMessage)
  });

  socket.on('createMessagePrivate', async (data) => {
    const { message, users } = data;
    const value = await RoomPrivate.addMessagePrivate({ users, message });
    rooms = await RoomPrivate.getAllRoomPrivate();
    io.emit('chatRoomsServer', rooms);
    io.emit('privateChatRoom', value);
  })
});

app.listen(8080);
console.log(`Conectado a porta ${8080}`);
