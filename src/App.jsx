import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Messages from './Messages.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [{
        id: 1,
        type: "user",
        text: "I won't be impressed with technology until I can download food.",
        user: "Anonymous1"
      }, {
        id: 2,
        type: "user",
        text: "hey",
        user: "TheLegend27"
      }, {
        id: 3,
        type: "system",
        text: "Anonymous1 changed their name to nomnom."
      }]
    };
  }


  render() {
    console.log("Rendering <App/>");
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <Messages messages={this.state.messages} />
      <ChatBar />
      </div>
    );
  }
}

export default App;
