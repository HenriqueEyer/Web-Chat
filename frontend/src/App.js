import React from 'react';
import Chat from './pages/Chat';
import PrivateChat from './pages/PrivateChat';
import { Provider } from './context/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/" component={Chat} />
          <Route exact path="/private/:selectIdUser" component={PrivateChat} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
