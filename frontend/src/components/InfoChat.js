import React from 'react';
import '../style/component/InfoChat.css';

function InfoChat() {
  return (
    <div className="InfoChat">
      <h2>Bem vindo ao <span className="style-name">WhatsDown.io!</span></h2>
      <p>
        Um pequeno chat para conversar!
      </p>
      <p>
        Suporta mensagens privadas!
      </p>
      <ul className="list-ul">
        Tecnologias usadas
        <li>React</li>
        <li>Mongodb</li>
        <li>Socket.io</li>
        <li>ContextApi</li>
      </ul>
      <h3>Desenvolvido por Henrique Eyer</h3>
      <h3>Projetos realizado no curso da <span className="style-trybe">Trybe!</span></h3>
    </div>
  )
}

export default InfoChat;
