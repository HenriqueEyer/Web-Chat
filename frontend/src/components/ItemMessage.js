import React, { useContext } from 'react';
import moment from 'moment';
import { MessageContext } from '../context';
import '../style/component/ItemMessage.css';

function ItemMessage({ att: { hour, author, content } }) {
  const { login: { userName } } = useContext(MessageContext);
  return (
    <div className={(userName === author ? 'ItemMessage user' : 'ItemMessage otherUser')}>
      <div><span className="name">{`${author}`}</span> - <span>{`${moment(hour).format('MMMM Do YYYY, h:mm:ss a')}`}</span></div>
      <p>{content}</p>
    </div>
  );
}

export default ItemMessage;
