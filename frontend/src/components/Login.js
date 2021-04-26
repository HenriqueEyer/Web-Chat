import React, { useState, useContext } from 'react';
import { MessageContext } from '../context'
import '../style/component/Login.css';

function Login() {
  const { userLogin, login } = useContext(MessageContext)
  const [value, setValue] = useState();
  if (login.isLogin) return <input type="button" value="Sair" onClick={() => userLogin()} />
  return (
    <div className="Login">
      <h2>Login</h2>
      <input type="text" className="ipt" placeholder="Digite o seu nome" onChange={(e) => setValue(e.target.value)} />
      <input type="button" className="btn ipt" value="Login" disabled={!value} onClick={() => userLogin(value)} />
    </div>
  );
}

export default Login;
