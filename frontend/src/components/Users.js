import React from 'react';
import { Link } from 'react-router-dom';
import '../style/component/Users.css';

function Users({ id, userName }) {
  return (
    <div className="Users">
      <Link className="btn-link" to={`/private/${id}`} >{`>>`}</Link>
      <p>{userName}</p>
    </div>
  );
}

export default Users;
