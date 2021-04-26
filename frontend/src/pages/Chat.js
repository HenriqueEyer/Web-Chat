import React, { useState, useContext, useEffect } from 'react';
import ItemMessage from '../components/ItemMessage';
import Login from '../components/Login';
import InputMessage from '../components/InputMessage';
import ListUser from '../components/ListUser.js';
import TextNotification from '../components/TextNotification';
import io from 'socket.io-client';
import { MessageContext } from '../context';
import '../style/pages/Chat.css';
import InfoChat from '../components/InfoChat';

const socket = io('http://localhost:4555');
socket.on('connect', () => console.log('LOGOU'))

function Chat() {
  const { login, messages, setMessages, setServer, setRoom, verifyLogin } = useContext(MessageContext);
  const [notification, setNotification] = useState();
  const sendMessage = (content) => socket.emit('message', { content, author: login.userName });
  useEffect(() => {
    if (login.isLogin && !verifyLogin()) socket.emit('login', login);
  }, [login])
  socket.on('serverStatus', (serverStatus) => setServer(serverStatus));
  socket.on('messageServer', (data) => setMessages(data));
  socket.on('notification', (value) => setNotification(value));
  socket.on('chatRoomsServer', (value) => setRoom(value));
  window.onbeforeunload = () => { if (login.isLogin) { socket.emit("logoff", login) } };
  return (
    <main className="Chat"><div className="sub-main">
      {login.isLogin || <Login />}{login.isLogin || <InfoChat />}
      {!login.isLogin || <div className="container">
        <ListUser />
        <div className="sub-container">
          <div className="list-messages">{!messages || messages.map((data, index) => <ItemMessage key={`men${index}`} att={data} />)}</div>
          <InputMessage sendMessage={(value) => sendMessage(value)} />
        </div></div>}
      {!notification || <TextNotification message={notification} setNotification={() => setNotification()} />}
    </div>
    </main>
  );
}

export default Chat;
