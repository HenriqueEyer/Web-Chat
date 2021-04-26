import React from 'react';
import '../style/component/TextNotification.css';

function TextNotification({ message, setNotification }) {
  setTimeout(() => {
    setNotification();
  }, 3000);
  return (
    <div className="TextNotification">
      <h2>{message}</h2>
      <input className="x-btn" type="button" value="x" onClick={() => setNotification()} />
    </div>
  );
}

export default TextNotification;
