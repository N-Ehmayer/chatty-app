import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalUsers: 0,
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

  /* Grabs incoming data from server */
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "userTotal") {
        this.setState({totalUsers: data.clientTotal})

      } else {
        const newMessage = this.state.messages.concat(data);
        this.setState({messages: newMessage});
      }

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
      <NavBar userCount={this.state.totalUsers} />
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
