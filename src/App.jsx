import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Messages from './Messages.jsx';

class App extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <Messages/>
      <ChatBar/>
      </div>
    );
  }
}
export default App;
