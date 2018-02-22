import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: []
    };

    this.setNewUser = this.setNewUser.bind(this);
    this.addNewMessage = this.addNewMessage.bind(this);
  }


  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:3001");// <--- Connects app to server
    console.log("Connected to server");

  /* Grabs incoming messages from server */
    this.socket.onmessage = (event) => {

      const newMessage = this.state.messages.concat(JSON.parse(event.data));
      this.setState({messages: newMessage});
    };

  }

  setNewUser(newUserText) {
    const oldUser = this.state.currentUser.name;
    const newUser = newUserText;

    if (oldUser !== newUser) {
      this.setState({currentUser: {name: newUser}});

      const systemMessageObject = {
        type: "system",
        text: `${oldUser} changed their name to ${newUser}`
      }
      this.socket.send(JSON.stringify(systemMessageObject));
    }
  }


  addNewMessage(messageText) {
    const text = messageText;
    const user = this.state.currentUser.name;

    const newMessageObject = {
      type: "user",
      text: text,
      user: user,
    };

    this.socket.send(JSON.stringify(newMessageObject));
  }


  render() {
    console.log("Rendering <App/>");

    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages} />
      <ChatBar
        currentUser={this.state.currentUser.name}
        newUser={this.setNewUser}
        newMessage={this.addNewMessage} />
      </div>
    );
  }
}

export default App;
