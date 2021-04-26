import React, { useContext, useEffect, useState } from 'react';
import ItemMessage from '../components/ItemMessage';
import InputMessage from '../components/InputMessage';
import HowITalking from '../components/HowITalking.js';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import { MessageContext } from '../context';
import '../style/pages/Chat.css';

const socket = io('http://localhost:4555');
socket.on('connect', () => console.log('LOGOU'))

const sendMessage = (content, author, selectIdUser, id) => {
  console.log('selectIdUser:', selectIdUser)
  console.log('id:', id)
  console.log({ message: { content, author }, users: [selectIdUser, id] })
  socket.emit('createMessagePrivate', { message: { content, author }, users: [selectIdUser, id] });
}

function PrivateChat({ match: { params: { selectIdUser } } }) {
  const { login, room } = useContext(MessageContext);
  const [messageRooms, setMessageRooms] = useState();
  useEffect(() => {
    updateChatRoom(room)
  }, [])
  const updateChatRoom = (chatsRooms) => {
    const chatRoom = validData(chatsRooms, selectIdUser, login.id);
    if (!chatRoom) return false;
    setMessageRooms(chatRoom.messages);
  }
  socket.on('chatRoomsServer', (data) => updateChatRoom(data));
  window.onbeforeunload = () => socket.emit("logoff", login.id);
  if (!login.isLogin) return <Redirect to="/" />
  return (
    <main className="Chat">
      {!login.isLogin || <div className="sub-main-private">
        <HowITalking privateUser={selectIdUser} />
        <div className="sub-container-private">
          <div className="list-messages">{!messageRooms || messageRooms.map((data) => <ItemMessage att={data} />)}</div>
          <InputMessage sendMessage={(value) => sendMessage(value, login.userName, selectIdUser, login.id)} />
        </div>
      </div>
      }
    </main>
  );
}

const verifyIds = (value, selectIdUser, id) => {
  return ([id, selectIdUser].includes(value.users1) && [id, selectIdUser].includes(value.users2));
}
const validData = (data, selectIdUser, id) => {
  if (!data) return false;
  return data.find((values) => verifyIds(values, selectIdUser, id));
}

export default PrivateChat;
