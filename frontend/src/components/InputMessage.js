import React, { useState } from 'react';
import '../style/component/InputMessage.css';

function InputMessage({ sendMessage }) {
  const [value, setValue] = useState();

  const send = () => {
    sendMessage(value);
    setValue('');
  }
  
  return (
    <div className="InputMessage">
      <input type="text" value={value} placeholder="Envie uma mensagem" className="ipt" onChange={(e) => setValue(e.target.value)} />
      <input type="button" value=">" className="btn-message" disabled={!value} onClick={() => send(value)} />
    </div>
  );
}

export default InputMessage;
