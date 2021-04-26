import React, { useContext } from 'react';
import { MessageContext } from '../context';
import Users from './Users';
import '../style/component/ListUser.css';

const filterUser = (array, id) => array.filter((user) => user.id !== id)

function ListUser() {
  const { users, login } = useContext(MessageContext);
  if (!users) return <h2 className="style-title" >Ninguém Online</h2>
  return (
    <div className="container-left">
      <div className="info-user"><h3>{`Logado como: ${login.userName}`}</h3></div>
      <h2 className="style-title">Online</h2>
      <div className="ListUser">
        {(filterUser(users, login.id).length === 0)
          ? <h2 className="style-title">Ninguém Online</h2>
          : filterUser(users, login.id).map(({ id, userName }) => (
            <Users key={id} id={id} userName={userName} />
          ))}
      </div>
    </div>
  );
}

export default ListUser;
