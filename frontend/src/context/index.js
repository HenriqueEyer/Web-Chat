import React, { useState, createContext } from 'react';
import { v4 as uuid4 } from 'uuid';
import PropTypes from 'prop-types';

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [login, setLogin] = useState({ userName: '', isLogin: false, id: '' });
  const [messages, setMessages] = useState();
  const [users, setUsers] = useState();
  const [room, setRoom] = useState();

  const setServer = (values) => {
    const { chats, userOnline } = values;
    setRoom(chats)
    setUsers(userOnline)
  }

  const verifyLogin = () => {
    if (!users) return false;
    return users.some((user) => user.id === login.id);
  }

  const userLogin = (name) => {
    if (!name) return setLogin({ userName: '', isLogin: false, id: '' })
    setLogin({ userName: name, isLogin: true, id: uuid4() });
  }

  const context = {
    setServer,
    messages,
    setMessages,
    users,
    setUsers,
    room,
    setRoom,
    login,
    userLogin,
    verifyLogin
  };

  return (
    <MessageContext.Provider value={context}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider as Provider };

MessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
